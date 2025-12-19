"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import { Fragment } from "react";
import OfficialDebuggers from "./_components/debugger";
import GenerateSitemap from "./_components/generate-sitemap";
import GenerateTags from "./_components/generate-tags";
import Header from "./_components/header";
import { previews } from "./_components/preview/previews";
import SeoForm from "./_components/seo-form";
import { Settings } from "./_components/settings";

export default function Home() {
  return (
    <main aria-labelledby="container" className={cn("mx-auto max-w-5xl px-8 pb-12 xl:px-4")}>
      <Header />
      <section className="mt-10 items-start justify-center gap-20 md:grid md:grid-cols-2">
        <div className={cn("h-fit overflow-y-auto md:sticky md:-top-6 lg:pr-10 xl:pr-20")}>
          <p className={"containerTitle"}>Metadata</p>
          <SeoForm />
          <OfficialDebuggers />
          <div className="mt-10">
            <Label className="mb-6">Settings</Label>
            <Settings />
            {/* <Rating /> */}
          </div>
          <div className="mt-10">
            <Label className="mb-6">Template</Label>
            <Button onClick={() => 
              window.open('template.html')} 
              className="cursor-pointer bg-blue-600 text-white after:flex-1 hover:bg-blue-500/90">
              <span className="pointer-events-none flex-1">
                <Settings2 className="opacity-60" size={16} aria-hidden="true" />
              </span>
              View Template
            </Button>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className={"containerTitle"}>Preview</p>
            <GenerateTags />
            <GenerateSitemap />
          </div>
          <div className="mt-6 space-y-10">
            {previews.map(({ name, component: Component }) => (
              <Fragment key={name}>
                <Component />
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
