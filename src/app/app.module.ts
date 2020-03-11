import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiServiceService } from './api-service.service';
import { HomeComponent } from './components/home/home.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterComponent } from './components/character/character.component';
import { HousesComponent } from './components/houses/houses.component';
import { HouseComponent } from './components/house/house.component';
import { SpellsComponent } from './components/spells/spells.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, FontAwesomeModule ],
  declarations: [ AppComponent, HomeComponent, CharactersComponent, HousesComponent, SpellsComponent, CharacterComponent, HouseComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ApiServiceService]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fab, far, fas);
  }
}
