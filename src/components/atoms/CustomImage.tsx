interface CustomImageProps {
  className: string;
  src: string;
  alt: string;
}
export function CustomImage({ className, src, alt }: CustomImageProps) {
  return <img className={className} src={src} alt={alt} />;
}
