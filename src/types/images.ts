import { StaticImageData } from "next/image";

export type Banner = {
  src: StaticImageData | string;
  alt?: string;
  width?: number;
  height?: number;
  link?: string;
  // props extras que quiser
  [key: string]: any;
}

export type Banners = Banner[];