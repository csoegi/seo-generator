import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { AlertOctagonIcon, TagIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { ComponentSource } from "../meta-tags-source";

export default function GenerateSitemapModal({ children }: { children: React.ReactNode }) {
    const { siteName, title, description, url, iconImageFile, logoImageFile, imageFile, ampUrl, registerUrl, loginUrl, getIsFormComplete } = useSeoFormStore();
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
          // Get the relative path (e.g., "folder/sub/page.html")
          let cleanPath = file.webkitRelativePath;

          // Remove the extension (.html or .htm) using a Regex
          cleanPath = cleanPath.replace(/\.html?$/i, '');

          htmlFiles.push(cleanPath);
        }
      }
  
      // 2. Generate Sitemap XML
      const xml = generateXml(htmlFiles, baseUrl);
  
      // 3. Trigger Download
      downloadXml(xml);
      setIsGenerating(false);
    };
  
    const generateXml = (filePaths: string[], base: string) => {
      // Ensure base ends with a slash so new URL(filename, base) resolves correctly
      const normalizedBase = base.endsWith('/') ? base : `${base}/`;

      const urlSet = filePaths.map(path => {
        // 1. Get only the filename (e.g., "folder/sub/file.html" -> "file.html")
        const filenameWithExt = path.split('/').pop() || "";

        // 2. Remove the .html extension for your slug-like URL
        const slug = filenameWithExt.replace(/\.html?$/i, '');

        // 3. Resolve against base (e.g., https://example.com/publications/ + gila-slot)
        const fullUrl = new URL(slug, normalizedBase).href;

        return `<url>
<loc>${fullUrl}</loc>
<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>`;
      }).join('\n');
  
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-auto p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-h-none [&>button:last-child]:hidden">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2">
              <TagIcon className="text-blue-500" />
              <p>Generate Sitemap</p>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <XIcon />
              </Button>
            </DialogClose>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="p-4">
              <p className="flex items-center gap-2 text-sm font-medium mb-4">
                Enter Site URL
              </p>              
              <Input className="block w-full mb-4 p-2 border"
                      placeholder="Target Base URL (e.g., https://example.com/pub/)"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}/>
              
              {/* Tabs wrapper */}
              <Tabs defaultValue="sitemap">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
                    <TabsTrigger value="robotstxt">Robots.txt</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="sitemap">            
                  <Alert variant="warning" className="mb-2">
                    <AlertOctagonIcon />
                    <AlertDescription>
                      <p>Local publication folder is where you keep all the static files. You need to keep the files in sync with the server before generating the sitemap.</p>
                    </AlertDescription>
                  </Alert>         
                  <p className="flex items-center gap-2 text-sm font-medium mb-4">
                    Select Local Publications Folder:
                  </p>   
                  <input
                    type="file"
                    // @ts-ignore - webkitdirectory is a non-standard but widely supported attribute
                    webkitdirectory=""
                    directory=""
                    onChange={handleFolderSelect}
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive -ms-px rounded-s-none shadow-none"
                  />
                  {isGenerating && <p>Processing files...</p>}
                </TabsContent>                
                <TabsContent value="robotstxt">
                  <Alert variant="warning" className="mb-2">
                    <AlertOctagonIcon />
                    <AlertDescription>
                      <p>This is only example. You only need to copy the highlighted code to robots.txt file in target server. DO NOT COPY AND REPLACE THE ORIGINAL.</p>
                    </AlertDescription>
                  </Alert> 
                  <ComponentSource src={`
  # *
  User-agent: *
  Disallow: /admin/*

  # Sitemaps
  Copy and insert this line only ⬇️
  Sitemap: ${baseUrl}/sitemap.xml
                      `}
                    />
                  <div className="flex justify-end p-2 text-sm">
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
