import { SeoFormState } from "@/store/use-seo-form-store";

type MetaTagsProps = Omit<
  SeoFormState,
  "setSiteName" | "setTitle" | "setDescription" | "setIconImageFile" | "setLogoImageFile" | "setImageFile" | "setUrl" | "setAmpUrl" | "setRegisterUrl" | "setLoginUrl" | "getIsFormComplete"
>;

export function getNextJsMetadataCode(props: MetaTagsProps) {
  const vercelBlobBaseUrl = `${process.env.NEXT_PUBLIC_BLOB_BASE_URL}`;

  const defaultIconUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_ICON}`;
  const defaultLogoUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_LOGO}`;
  const defaultBannerUrl = `${vercelBlobBaseUrl + process.env.NEXT_PUBLIC_DEFAULT_BANNER}`;

  const iconImageUrl = `${props.iconImageFile ? props.iconImageFile.preview : defaultIconUrl}`;
  const logoImageUrl = `${props.logoImageFile ? props.logoImageFile.preview : defaultLogoUrl}`;
  const bannerImageUrl = `${props.imageFile ? props.imageFile.preview : defaultBannerUrl}`;

  return `export const metadata = {
  title: "${props.title}",
  description: "${props.description}",
  openGraph: {
    type: "website",
    ${props.url ? `url: "${props.url}",` : ""}
    title: "${props.title}",
    description: "${props.description}",
    ${bannerImageUrl ? `images: ["${bannerImageUrl}"],` : ""}
    siteName: "${props.title}",
  },
  twitter: {
    card: "summary_large_image",
    ${props.url ? `url: "${props.url}",` : ""}
    title: "${props.title}",
    description: "${props.description}",
    ${bannerImageUrl ? `images: ["${bannerImageUrl}"],` : ""}
  },
};`;
}
