import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DivulgarObraPage } from './divulgar-obra.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DivulgarObraPage }]), 
  ],
  declarations: [DivulgarObraPage]
})
export class DivulgarObraPageModule {}
