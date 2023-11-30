import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopupComponent } from './popup.component';
import { PopupComponentService } from './popup.component.service';

@NgModule({
  declarations: [PopupComponent],
  imports: [CommonModule, OverlayModule],
  exports: [PopupComponent],
  providers: [PopupComponentService]
})
export class PopupComponentModule {}
