export type LoaderSize =
  | "sm"
  | "md"
  | "lg";

export interface LoaderProps {
  fullScreen?: boolean;
  size?: LoaderSize;
}