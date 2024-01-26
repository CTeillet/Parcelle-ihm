import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksModule } from './blocks/blocks.module';
import { PlotsModule } from './plots/plots.module';
import { TerritoriesModule } from './territories/territories.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlocksModule,
    PlotsModule,
    TerritoriesModule,
    CoreModule,
    SharedModule,
  ],
})
export class ProtectedModule {}
