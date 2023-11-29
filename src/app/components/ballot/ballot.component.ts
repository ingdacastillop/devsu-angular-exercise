import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ballot',
  templateUrl: './ballot.component.html',
  styleUrls: ['./ballot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BallotComponent {
  @Input()
  public initials?: string;

  @Input()
  public photo?: string;

  @Input()
  public subtitle?: string;

  @Input()
  public bordered = false;

  @Input()
  public skeleton = false;

  public get hasAvatar(): boolean {
    return !!this.initials || !!this.photo;
  }
}
