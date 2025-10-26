// images.d.ts
declare module "*.png" {
  const src: string;
  const height: number;
  const width: number;
  export default value;
}

declare module "*.ico" {
  const src: string;
  export default value;
}
