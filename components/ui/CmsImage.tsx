import Image, { type ImageProps } from "next/image";
import { mediaUrl } from "@/lib/media-url";

type CmsImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

/** next/image wrapper that resolves CMS media paths and skips empty sources. */
export function CmsImage({ src, alt = "", ...props }: CmsImageProps) {
  const url = mediaUrl(src);
  if (!url) return null;
  return <Image src={url} alt={alt} {...props} />;
}
