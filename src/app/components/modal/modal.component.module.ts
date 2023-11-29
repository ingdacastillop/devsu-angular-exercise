import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalComponentService } from './modal.component.service';

@NgModule({
  declarations: [ModalComponent],
  imports: [OverlayModule],
  exports: [ModalComponent],
  providers: [ModalComponentService]
})
export class ModalComponentModule {}
