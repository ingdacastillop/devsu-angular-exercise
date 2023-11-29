import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { PaginationPipe } from './pagination.pipe';
import { IconComponentModule } from '../icon/icon.component.module';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule, IconComponentModule],
  exports: [PaginationComponent],
  providers: [PaginationPipe]
})
export class PaginationComponentModule {}
