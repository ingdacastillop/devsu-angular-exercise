import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {
  @Input()
  public visible = false;

  private component?: HTMLElement;

  constructor(private elementRef: ElementRef) {}

  public get show(): boolean {
    return this.visible;
  }

  public open(): void {
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
  }

  public append(children: any): void {
    if (!this.component) {
      this.component =
        this.elementRef.nativeElement.querySelector('.modal__component');
    }

    this.component?.appendChild(children);
  }
}
