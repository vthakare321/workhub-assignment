import type { LazyExoticComponent, ComponentType } from "react";
import type { Permission } from "@/config/permissions";

export interface AppRoute {
  path: string;
  component: LazyExoticComponent<ComponentType>;

  permissions?: Permission[];
}