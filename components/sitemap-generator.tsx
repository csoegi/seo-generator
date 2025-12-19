'use client';
import { useState } from 'react';

export default function SitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState('https://example.com/publications/');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFolderSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsGenerating(true);
    const htmlFiles: string[] = [];

    // 1. Filter only HTML files from the selected folder
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // webkitRelativePath gives the path within the folder
      if (file.name.endsWith('.html') || file.name.endsWith('.htm')) {
        htmlFiles.push(file.webkitRelativePath);
      }
    }

    // 2. Generate Sitemap XML
    const xml = generateXml(htmlFiles, baseUrl);

    // 3. Trigger Download
    downloadXml(xml);
    setIsGenerating(false);
  };

  const generateXml = (filePaths: string[], base: string) => {
    const urlSet = filePaths.map(path => {
      // Create valid URL by combining base with relative path
      const fullUrl = new URL(path, base).href;
      return `
      <url>
        <loc>${fullUrl}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
    }).join('\n');

    return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="www.sitemaps.org">
    ${urlSet}
    </urlset>`;
  };

  const downloadXml = (xml: string) => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-10 border rounded-lg">
      <h3>Sitemap Generator (Local Folder Mode)</h3>
      <input 
        type="text" 
        placeholder="Target Base URL (e.g., https://example.com/pub/)" 
        className="block w-full mb-4 p-2 border"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
      />
      <label className="block mb-2 font-bold">Select Local Publications Folder:</label>
      <input
        type="file"
        // @ts-ignore - webkitdirectory is a non-standard but widely supported attribute
        webkitdirectory=""
        directory=""
        onChange={handleFolderSelect}
        className="block w-full"
      />
      {isGenerating && <p>Processing files...</p>}
    </div>
  );
}
