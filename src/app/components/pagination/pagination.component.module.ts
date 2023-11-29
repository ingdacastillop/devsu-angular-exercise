import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { PaginationPipe } from './pagination.pipe';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule],
  exports: [PaginationComponent],
  providers: [PaginationPipe]
})
export class PaginationComponentModule {}
