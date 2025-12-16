import { FileWithPreview } from "@/hooks/use-file-upload";
import { create } from "zustand";

export type SeoFormState = {
  title: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription: (description: string) => void;
  siteName: string;
  setSiteName: (title: string) => void;
  imageFile: FileWithPreview | undefined;
  setImageFile: (image: FileWithPreview) => void;
  url?: string;
  setUrl: (url: string) => void;
  ampUrl?: string;
  setAmpUrl: (ampUrl: string) => void;
  registerUrl?: string;
  setRegisterUrl: (registerUrl: string) => void;
  loginUrl?: string;
  setLoginUrl: (loginUrl: string) => void;
  getIsFormComplete: () => boolean;
};

export const useSeoFormStore = create<SeoFormState>((set) => ({
  title: "",
  setTitle: (title: string) => set({ title }),
  description: "",
  setDescription: (description: string) => set({ description }),
  siteName: "",
  setSiteName: (siteName: string) => set({ siteName }),
  imageFile: undefined,
  setImageFile: (imageFile: FileWithPreview) => set({ imageFile }),
  url:  "www.example.com",
  setUrl: (url: string) => set({ url }),
  ampUrl:  "m.example.com",
  setAmpUrl: (ampUrl: string) => set({ ampUrl }),
  registerUrl:  "www.example.com/register",
  setRegisterUrl: (registerUrl: string) => set({ registerUrl }),
  loginUrl:  "www.example.com/login",
  setLoginUrl: (loginUrl: string) => set({ loginUrl }),
  getIsFormComplete: (): boolean => {
    const { title, description, siteName, imageFile, url, ampUrl, registerUrl, loginUrl } = useSeoFormStore.getState();
    const hasTitle = typeof title === "string" && title.trim().length > 0;
    const hasDescription = typeof description === "string" && description.trim().length > 0;
    const hasSiteName = typeof siteName === "string" && title.trim().length > 0;
    const hasImage = imageFile instanceof File;
    const hasUrl = typeof url === "string" && /^https?:\/\/.+/.test(url.trim());
    const hasAmpUrl = typeof ampUrl === "string" && /^https?:\/\/.+/.test(ampUrl.trim());
    const hasRegisterUrl = typeof registerUrl === "string" && /^https?:\/\/.+/.test(registerUrl.trim());
    const hasLoginUrl = typeof loginUrl === "string" && /^https?:\/\/.+/.test(loginUrl.trim());

    return hasTitle && hasDescription && hasSiteName && hasImage && hasUrl && hasAmpUrl && hasRegisterUrl && hasLoginUrl;
  },
}));
