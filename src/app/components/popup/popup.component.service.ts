import { Overlay } from '@angular/cdk/overlay';
import { ComponentRef, Injectable } from '@angular/core';
import { OverlayElement, overlayElementFactory } from '../overlay';
import { PopupComponent } from './popup.component';
import { PopupConfig } from './popup.config';

@Injectable({ providedIn: 'root' })
export class PopupComponentService {
  private ref: ComponentRef<PopupComponent>;

  private overlayElement: OverlayElement<PopupComponent>;

  private component: PopupComponent;

  constructor(private overlay: Overlay) {
    this.overlayElement = overlayElementFactory(this.overlay, PopupComponent);

    this.ref = this.overlayElement.componentRef;

    this.component = this.ref.instance;
  }

  public launch(config: PopupConfig): void {
    this.component.launch(config);
  }

  public destroy(): void {
    this.overlayElement.destroy();
  }
}
