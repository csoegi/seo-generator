import FileUploader from "@/components/file-uploader";
import KeyCommand from "@/components/key-command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import { useSettingsStore } from "@/store/use-settings-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GenerateMetadataButton from "../generate-tags/generate-metadata-button";
import GenerateTagsModal from "../generate-tags/generate-tags-modal";
import FormLabelWithCounter from "./form-label-with-counter";

export default function SeoForm() {
  const { 
    title, setTitle, 
    description, setDescription, 
    siteName, setSiteName, 
    iconImageFile, 
    logoImageFile, 
    imageFile, 
    url, setUrl, 
    ampUrl, setAmpUrl, 
    registerUrl, setRegisterUrl, 
    loginUrl, setLoginUrl = () => {} 
  } = useSeoFormStore();

  const { titleMaxLength, descriptionMaxLength, isIconImage, isLogoImage, isFileImage } = useSettingsStore();

  const seoFormSchema = z.object({
    siteName: z
      .string()
      .min(1, "Site name is required"),
    title: z
      .string()
      .min(1, "Title is required")
      .max(titleMaxLength, `Title must be less than ${titleMaxLength} characters`),
    description: z
      .string()
      .min(1, "Description is required")
      .max(descriptionMaxLength, `Description must be less than ${descriptionMaxLength} characters`),
    iconImageFile: z.any().optional(),
    logoImageFile: z.any().optional(),
    imageFile: z.any().optional(),
    url: z.url().optional(),
    ampUrl: z.url().optional(),
    registerUrl: z.url().optional(),
    loginUrl: z.url().optional(),
  });

  const seoForm = useForm({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      siteName,
      title,
      description,
      iconImageFile,
      logoImageFile,
      imageFile,
    },
  });

  const onSubmit = (data: z.infer<typeof seoFormSchema>) => {
    // Form is automatically synced with Zustand store via controlled components
  };

  return (
    <div className="mt-6">
      <Form {...seoForm}>
        <form onSubmit={seoForm.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={seoForm.control}
            name={"siteName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={siteName}
                    onChange={(event) => { 
                      setSiteName(event.target.value); 
                      setTitle(event.target.value); 
                      setUrl(event.target.value.trim().toLocaleLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]+/g, ""));
                    }}
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription>
                  Site Name is required.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"title"}
            render={({ field }) => (
              <FormItem>
                <FormLabelWithCounter
                  count={title.length}
                  max={titleMaxLength}
                  tooltip={<p>Recommended keep titles under 60 characters for proper display in search results</p>}
                >
                  Title
                </FormLabelWithCounter>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={titleMaxLength}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="text-lg"
                  />
                </FormControl>
                <FormDescription>
                  <KeyCommand>&lt;title /&gt;</KeyCommand> is a required.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabelWithCounter
                  count={description?.length ?? 0}
                  max={descriptionMaxLength}
                  tooltip={
                    <p>Recommended keep descriptions under 160 characters for proper display in search results</p>
                  }
                >
                  Description
                </FormLabelWithCounter>
                <FormControl>
                  <Textarea
                    {...field}
                    className="max-h-32"
                    value={description}
                    onChange={(event) => setDescription?.(event.target.value)}
                    maxLength={descriptionMaxLength}
                  />
                </FormControl>
                <FormDescription>
                  Description is required. Provide a short description of the page. 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={seoForm.control}
            name={"url"}
            render={({ field }) => (
              <FormItem>
                <div className="*:not-first:mt-2">
                  <FormLabel>
                    Page URL <span className="text-muted-foreground text-sm font-normal"></span>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs flex rounded-md">
                      <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                        https://
                      </span>
                      <Input
                        {...field}
                        className="-ms-px rounded-s-none shadow-none"
                        type="text"
                        value={url!}
                        placeholder={url!}
                        onChange={(event) => setUrl(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormDescription>
                  The URL of the page used by search engines to index your page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"ampUrl"}
            render={({ field }) => (
              <FormItem>
                <div className="*:not-first:mt-2">
                  <FormLabel>
                    Mobile Page URL <span className="text-muted-foreground text-sm font-normal"></span>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs flex rounded-md">
                      <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                        https://
                      </span>
                      <Input
                        {...field}
                        className="-ms-px rounded-s-none shadow-none"
                        type="text"
                        placeholder={ampUrl!}
                        onChange={(event) => setAmpUrl(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormDescription>
                  The URL of the mobile page. 
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"registerUrl"}
            render={({ field }) => (
              <FormItem>
                <div className="*:not-first:mt-2">
                  <FormLabel>
                    Register Link URL <span className="text-muted-foreground text-sm font-normal"></span>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs flex rounded-md">
                      <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                        https://
                      </span>
                      <Input
                        {...field}
                        className="-ms-px rounded-s-none shadow-none"
                        type="text"
                        placeholder={registerUrl!}
                        onChange={(event) => setRegisterUrl(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormDescription>
                  Link URL to register page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name={"loginUrl"}
            render={({ field }) => (
              <FormItem>
                <div className="*:not-first:mt-2">
                  <FormLabel>
                    Login Link URL <span className="text-muted-foreground text-sm font-normal"></span>
                  </FormLabel>
                  <FormControl>
                    <div className="shadow-xs flex rounded-md">
                      <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                        https://
                      </span>
                      <Input
                        {...field}
                        className="-ms-px rounded-s-none shadow-none"
                        type="text"
                        placeholder={loginUrl!}
                        onChange={(event) => setLoginUrl(event.target.value)}
                      />
                    </div>
                  </FormControl>
                </div>
                <FormDescription>
                  Link URL to login page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name="iconImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Image</FormLabel>
                <FormControl>
                  {isIconImage ? (
                    <FileUploader {...field} />
                  ) : (
                    <Input placeholder="Enter image URL or local Path" {...field} />
                  )}
                </FormControl>
                <FormDescription>
                  Upload icon image, or leave empty to use default icon.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name="logoImageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Image</FormLabel>
                <FormControl>
                  {isLogoImage ? (
                    <FileUploader {...field} />
                  ) : (
                    <Input placeholder="Enter image URL or local Path" {...field} />
                  )}
                </FormControl>
                <FormDescription>
                  Upload logo image (180 x 60 px), or leave empty to use default logo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={seoForm.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <FormControl>
                  {isFileImage ? (
                    <FileUploader {...field} />
                  ) : (
                    <Input placeholder="Enter image URL or local Path" {...field} />
                  )}
                </FormControl>
                <FormDescription>
                  Upload banner image (960 x 1170px), or leave empty to use default banner.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <GenerateTagsModal>
            <GenerateMetadataButton className="w-full items-center justify-center text-center" size="lg" />
          </GenerateTagsModal>
        </form>
      </Form>
    </div>
  );
}
