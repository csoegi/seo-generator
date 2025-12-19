import { create } from "zustand";

export type SettingsStore = {
  titleMaxLength: number;
  setTitleMaxLength: (length: number) => void;
  descriptionMaxLength: number;
  setDescriptionMaxLength: (length: number) => void;
  isIconImage: boolean;
  setIsIconImage: (isIconImage: boolean) => void;
  isLogoImage: boolean;
  setIsLogoImage: (isLogoImage: boolean) => void;
  isFileImage: boolean;
  setIsFileImage: (isFileImage: boolean) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  titleMaxLength: 60,
  setTitleMaxLength: (titleMaxLength: number) => set({ titleMaxLength }),
  descriptionMaxLength: 160,
  setDescriptionMaxLength: (descriptionMaxLength: number) => set({ descriptionMaxLength }),
  isIconImage: true,
  setIsIconImage: (isIconImage: boolean) => set({ isIconImage }),
  isLogoImage: true,
  setIsLogoImage: (isLogoImage: boolean) => set({ isLogoImage }),
  isFileImage: true,
  setIsFileImage: (isFileImage: boolean) => set({ isFileImage }),
}));
