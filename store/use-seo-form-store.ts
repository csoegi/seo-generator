import { FileWithPreview } from "@/hooks/use-file-upload";
import { create } from "zustand";

export type SeoFormState = {  
  siteName: string;
  setSiteName: (siteName: string) => void;
  title: string;
  setTitle: (title: string) => void;
  description?: string;
  setDescription: (description: string) => void;
  iconImageFile: FileWithPreview | undefined;
  setIconImageFile: (iconImageFile: FileWithPreview) => void;
  logoImageFile: FileWithPreview | undefined;
  setLogoImageFile: (logoImageFile: FileWithPreview) => void;
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
  iconImageFile: undefined,
  setIconImageFile: (iconImageFile: FileWithPreview) => set({ iconImageFile }),
  logoImageFile: undefined,
  setLogoImageFile: (logoImageFile: FileWithPreview) => set({ logoImageFile }),
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
    const { title, description, siteName, iconImageFile, logoImageFile, imageFile, url, ampUrl, registerUrl, loginUrl } = useSeoFormStore.getState();
    const hasTitle = typeof title === "string" && title.trim().length > 0;
    const hasDescription = typeof description === "string" && description.trim().length > 0;
    const hasSiteName = typeof siteName === "string" && title.trim().length > 0;
    const hasIconImage = iconImageFile instanceof File;
    const hasLogoImage = logoImageFile instanceof File;
    const hasImage = imageFile instanceof File;
    const hasUrl = typeof url === "string" && url.trim().length > 0;
    const hasAmpUrl = typeof ampUrl === "string" && ampUrl.trim().length > 0;
    const hasRegisterUrl = typeof registerUrl === "string" && registerUrl.trim().length > 0;
    const hasLoginUrl = typeof loginUrl === "string" && loginUrl.trim().length > 0;

    //DEBUG
    // console.log("1-" + hasSiteName);
    // console.log("2-" + hasTitle);
    // console.log("3-" + hasDescription);
    // console.log("4-" + hasUrl + " " + url);
    // console.log("5-" + hasAmpUrl + " " + ampUrl);
    // console.log("6-" + hasRegisterUrl + " " + registerUrl);
    // console.log("7-" + hasLoginUrl + " " + loginUrl);

    return hasSiteName && hasTitle && hasDescription && hasUrl && hasAmpUrl && hasRegisterUrl && hasLoginUrl;
  },
}));
