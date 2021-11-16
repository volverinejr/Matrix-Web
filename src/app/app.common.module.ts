import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoPipe } from 'src/app/shared/pipe/yesNo.pipe';
import { LibPrimeNGModule } from './lib-prime-ng/lib-prime-ng.module';
import { ColorStatusPipe } from './shared/pipe/colorStatus.pipe';


@NgModule({
  declarations: [ YesNoPipe, ColorStatusPipe ],
  imports: [
  ],
  exports: [
    LibPrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    YesNoPipe,
    ColorStatusPipe,
  ]
})
export class AppCommonModule { }
