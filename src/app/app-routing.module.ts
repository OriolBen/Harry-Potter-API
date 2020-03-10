import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterComponent } from './components/character/character.component';
import { HousesComponent } from './components/houses/houses.component';
import { HouseComponent } from './components/house/house.component';
import { SpellsComponent } from './components/spells/spells.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'character/:id',
    component: CharacterComponent
  },
  {
    path: 'houses',
    component: HousesComponent
  },
  {
    path: 'house/:id',
    component: HouseComponent
  },
  {
    path: 'spells',
    component: SpellsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
