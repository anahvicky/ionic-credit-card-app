import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardInputPageRoutingModule } from './card-input-routing.module';

import { CardInputPage } from './card-input.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardInputPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CardInputPage]
})
export class CardInputPageModule {}
