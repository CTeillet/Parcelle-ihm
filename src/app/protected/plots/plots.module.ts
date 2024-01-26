import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatButton } from '@angular/material/button';
import { PlotComponent } from './plot/plot.component';

@NgModule({
  declarations: [PlotComponent],
  imports: [CommonModule, SharedModule, MatButton],
})
export class PlotsModule {}
