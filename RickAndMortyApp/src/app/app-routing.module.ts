import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './component/character-list/character-list.component';


const routes: Routes = [
  { path: 'characters', component: CharacterListComponent },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
