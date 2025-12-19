import { Facebook } from "@/components/icons/facebook";
import { Label } from "@/components/ui/label";
import { useSeoFormStore } from "@/store/use-seo-form-store";
import Image from "next/image";
import Link from "next/link";

export default function FacebookPreview() {
  const { url, title, description, imageFile } = useSeoFormStore();

  return (
    <div>
      <Label className="mb-6">
        <Facebook />
        Facebook
      </Label>
      <Link
        href={url!}
        target="_blank"
        rel="noopener noreferrer"
        className="group block cursor-pointer rounded-sm border bg-neutral-800 transition hover:brightness-95"
      >
        <Image
          src={imageFile?.preview || "/placeholder.jpg"}
          alt="Facebook Preview"
          layout="responsive"
          width={500}
          height={250}
        />
        <div className="border-t px-3 py-2.5">
          <p className="text-sm uppercase text-neutral-400">{url!}</p>
          <p className="font-semibold">{title}</p>
          <p className="truncate text-sm text-neutral-400">{description}</p>
        </div>
      </Link>
    </div>
  );
}
