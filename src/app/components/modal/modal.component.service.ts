import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {
  OnOverlay,
  OverlayElement,
  OverlayComponent,
  OverlayService
} from '../overlay';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalComponentService extends OverlayService {
  constructor(overlay: Overlay) {
    super(overlay);
  }

  public build<C extends OnModalOverlay<C>>(
    children: ComponentType<C>
  ): ModalOverlayComponent<C> {
    return new ModalOverlayComponent(
      this.factory(ModalComponent),
      this.factory(children)
    );
  }
}

export class ModalOverlayComponent<
  C extends OnModalOverlay<C>
> extends OverlayComponent<ModalComponent, C> {
  constructor(
    overlayParent: OverlayElement<ModalComponent>,
    overlayChildren: OverlayElement<C>
  ) {
    super(overlayParent, overlayChildren);

    this.parent.append(overlayChildren.nativeElement);
    this.children.ngOnOverlay(this);
  }

  public get show(): boolean {
    return this.parent.show;
  }

  public open(): void {
    this.parent.open();
  }

  public close(): void {
    this.parent.close();
  }
}

export interface OnModalOverlay<C> extends OnOverlay<ModalComponent, C> {
  ngOnOverlay(overlayComponent: ModalOverlayComponent<any>): void;
}
