'use client';

import { cn } from "@/lib/utils";
import { CheckIcon, DownloadIcon } from "lucide-react";
import React from 'react';
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const DownloadMetadataButton: React.FC<{ htmlString: string; filename: string }> = ({ htmlString, filename }) => {
  const handleDownload = () => {
    // 1. Create a Blob object from the HTML string
    const blob = new Blob([htmlString], { type: 'text/html' });
    
    // 2. Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // 3. Create a temporary anchor (<a>) element
    const link = document.createElement('a');
    link.href = url;
    // Set the download attribute with the sanitized filename to follow the Page URL slug
    link.setAttribute('download', filename.trim().toLocaleLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]+/g, "") + ".html"); 
    
    // 4. Append the link to the body, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 5. Clean up the temporary URL to free up memory
    URL.revokeObjectURL(url);
  };

  const [hasDownloaded, setHasDownloaded] = React.useState(false);
  
  React.useEffect(() => {
      const timeout = setTimeout(() => {
        setHasDownloaded(false);
      }, 2000);
  
      return () => clearTimeout(timeout);
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="download-button"
          size="icon"
          variant="ghost"
          className={cn("bg-code z-10 size-7 hover:opacity-100 focus-visible:opacity-100")}
          onClick={handleDownload}
        >
          <span className="sr-only">Download</span>
          {hasDownloaded ? <CheckIcon /> : <DownloadIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{hasDownloaded ? "Downloaded" : "Download"}</TooltipContent>
    </Tooltip>
  );
};

export default DownloadMetadataButton;