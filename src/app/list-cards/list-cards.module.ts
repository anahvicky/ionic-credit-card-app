import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCardsPageRoutingModule } from './list-cards-routing.module';

import { ListCardsPage } from './list-cards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCardsPageRoutingModule
  ],
  declarations: [ListCardsPage]
})
export class ListCardsPageModule {}
