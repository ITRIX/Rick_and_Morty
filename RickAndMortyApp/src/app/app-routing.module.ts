import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './component/character-list/character-list.component';
import { CharacterDetailsComponent } from './component/character-list/character-details/character-details.component';


const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  { path: 'character-details/:id', component: CharacterDetailsComponent },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
