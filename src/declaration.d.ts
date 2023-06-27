declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

// src/types/images.d.ts
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
