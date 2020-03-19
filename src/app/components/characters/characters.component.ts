import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { DataService } from '../../data.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit {
  characters : Array<any> = []
  houses : object = {}
  local : Array<string> = []
  name : string = ""
  filters : object = {
    "house": "Ignore",
    "bloodStatus": "Ignore",
    "deathEater": "Ignore",
    "dumbledoresArmy": "Ignore",
    "orderOfThePhoenix": "Ignore",
    "ministryOfMagic": "Ignore"
  }

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getCharacters()
    this.getHousesId()
    this.getAllCharacters()
  }

  getHousesId() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      data.forEach((house) => {
        this.houses[house.name] = house._id
      })
    })
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }

  check(value : string) : boolean {
    return typeof value !== 'undefined'
  }

  house(house : string) : string {
    return this.houses[house]
  }

  searchCharacters() : void {
    if (this.name != "") {
      this.api.getAllCharacters().subscribe((data : Array<any>) => {
        this.characters = []
        data.forEach((character) => {
          if (character.name.toLowerCase().includes(this.name.toLowerCase())) this.characters.push(character)
        })
      })
    }
  }

  customSearch() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = []
      data.forEach((character) => {
        let stop = false
        for (let index in this.filters) {
          if (this.filters[index] != "Ignore") {
            if (character[index].toString() != this.filters[index]) stop = true
          }
          if (stop) break
        }
        if (!stop) this.characters.push(character)
      })
    })
  }

  addCharacter(id : string) : void {
    this.local = this.storage.addFavourite("characters", id).characters
  }

  removeCharacter(id : string) : void {
    this.local = this.storage.removeFavourite("characters", id).characters
  }

  checkCharacter(id : string) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == id) return true
    }
    return false
  }
}