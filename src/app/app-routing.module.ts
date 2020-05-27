import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full'
  },
  {
    path: 'cards',
    loadChildren: () => import('./list-cards/list-cards.module').then( m => m.ListCardsPageModule)
  },
  {
    path: 'input',
    loadChildren: () => import('./card-input/card-input.module').then( m => m.CardInputPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
