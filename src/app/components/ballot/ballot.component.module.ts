import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BallotComponent } from './ballot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BallotComponent],
  exports: [BallotComponent]
})
export class BallotComponentModule {}
