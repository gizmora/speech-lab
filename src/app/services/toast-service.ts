import { Injectable, TemplateRef } from '@angular/core';
import { ToastInfo } from '../models/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string | TemplateRef<any>, options: { classname?: string; delay?: number; autohide?: boolean } = {}) {
    this.toasts.push({ header, body, ...options });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(body: string, header: string = 'Success', delay: number = 3000) {
    this.show(header, body, { classname: 'bg-success text-light', delay: delay });
  }

  showError(body: string, header: string = 'Error', delay: number = 5000) {
    this.show(header, body, { classname: 'bg-danger text-light', delay: delay });
  }

  showInfo(body: string, header: string = 'Info', delay: number = 4000) {
    this.show(header, body, { classname: 'bg-info text-light', delay: delay });
  }
}
