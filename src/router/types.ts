import type { LazyExoticComponent, ComponentType } from "react";

export interface AppRoute {
  path: string;
  component: LazyExoticComponent<ComponentType>;
  isProtected?: boolean;
  permissions?: string[];
}