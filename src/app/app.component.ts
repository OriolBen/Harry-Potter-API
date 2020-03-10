import { Component } from '@angular/core'
import { ApiServiceService } from './api-service.service'

@Component({
  selector : 'my-app',
  // CHANGE THIS!!!!
  templateUrl : './components/spells/spells.component.html',
  styleUrls : [ './components/spells/spells.component.css' ]
})

export class AppComponent  {
  randomHouse : string = ""
  house : Array<any> = []
  houses : Array<any> = []
  spells: Array<any> = []
  characters : Array<any> = []
  character : Array<any> = []
  characterID : string = "5a12292a0f5ae10021650d7e"
  constructor(private api : ApiServiceService) {}

  getRandomHogwartsHouse() : void {
    this.api.getRandomHogwartsHouse().subscribe((data : string) => {
        this.randomHouse = data
    })
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }

  getCharacter() : void {
    this.api.getCharacter(this.characterID).subscribe((data : Array<any>) => {
      this.character = data
    })
  }

  getAllHouses() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      this.houses = data
    }) 
  }

  getHouse(houseID) : void {
    this.api.getHouse(houseID).subscribe((data : Array<any>) => {
      this.house = data
    })
  }

  getAllSpells() : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = data
    })
  }
}
