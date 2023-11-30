import { Component, ViewEncapsulation } from '@angular/core';
import { PopupConfig } from './popup.config';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent {
  protected config?: PopupConfig;

  protected visible = false;

  public launch(config: PopupConfig): void {
    this.config = config;

    this.visible = true;
  }

  public onApproved(): void {
    this.visible = false;

    if (this.config?.approved?.onClick) {
      this.config.approved.onClick();
    }
  }

  public onReject(): void {
    this.visible = false;

    if (this.config?.reject?.onClick) {
      this.config.reject.onClick();
    }
  }
}
