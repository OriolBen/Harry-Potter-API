import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ApiServiceService } from './api-service.service';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HousesComponent } from './components/houses/houses.component';
import { SpellsComponent } from './components/spells/spells.component';
import { CharacterComponent } from './components/character/character.component';
import { HouseComponent } from './components/house/house.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HomeComponent, CharactersComponent, HousesComponent, SpellsComponent, CharacterComponent, HouseComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ApiServiceService]
})
export class AppModule { }
