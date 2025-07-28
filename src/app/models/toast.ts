import { TemplateRef } from "@angular/core";

export interface ToastInfo {
  header: string;
  body: string | TemplateRef<any>;
  classname?: string;
  delay?: number;
  autohide?: boolean;
}