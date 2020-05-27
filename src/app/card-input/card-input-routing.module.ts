import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardInputPage } from './card-input.page';

const routes: Routes = [
  {
    path: '',
    component: CardInputPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardInputPageRoutingModule {}
