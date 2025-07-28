import { Component, TemplateRef } from '@angular/core';
import { ToastService } from '../../../services/toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'toast',
  imports: [
    NgbToastModule
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  host: { 'class': 'toast-container position-fixed bottom-0 end-0 p-3', 'style': 'z-index: 1200' }
})
export class Toast {
  constructor(public toastService: ToastService) {}

  isTemplate(content: any): boolean {
    return content instanceof TemplateRef;
  }
}
