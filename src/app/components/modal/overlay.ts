import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';

export interface OverlayEvent {
  key: string;
  value?: any;
}

type OverlayListener = (_: OverlayEvent) => void;

export class OverlayElement<E> {
  public readonly componentRef: ComponentRef<E>;

  constructor(
    public readonly overlayRef: OverlayRef,
    public readonly portal: ComponentPortal<E>
  ) {
    this.componentRef = this.overlayRef.attach(this.portal);
  }

  public get instace(): E {
    return this.componentRef.instance;
  }

  public get nativeElement(): Element {
    return this.componentRef.location.nativeElement;
  }

  public destroy(): void {
    this.componentRef.destroy();
    this.overlayRef.dispose();
  }
}

export class OverlayComponent<C, E> {
  public readonly parent: C;

  public readonly children: E;

  private listeners: Array<OverlayListener> = [];

  constructor(
    public readonly overlayParent: OverlayElement<C>,
    public readonly overlayChildren: OverlayElement<E>
  ) {
    this.parent = this.overlayParent.componentRef.instance;
    this.children = this.overlayChildren.componentRef.instance;
  }

  public addListener(listener: OverlayListener): void {
    this.listeners.push(listener);
  }

  public emit(event: OverlayEvent): void {
    this.listeners.forEach((listener) => listener(event));
  }

  public destroy(): void {
    this.overlayParent.destroy();
    this.overlayChildren.destroy();
  }
}

export interface OnOverlay<C, E> {
  ngOnOverlay(overlay: OverlayComponent<C, E>): void;
}

export class OverlayService {
  constructor(protected overlay: Overlay) {}

  protected factory<E>(component: ComponentType<E>): OverlayElement<E> {
    return overlayElementFactory(this.overlay, component);
  }
}

export function overlayElementFactory<E>(
  overlay: Overlay,
  component: ComponentType<E>
): OverlayElement<E> {
  return new OverlayElement(overlay.create(), new ComponentPortal(component));
}
