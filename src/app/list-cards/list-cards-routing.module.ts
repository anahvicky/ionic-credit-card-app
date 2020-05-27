import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCardsPage } from './list-cards.page';

const routes: Routes = [
  {
    path: '',
    component: ListCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCardsPageRoutingModule {}
