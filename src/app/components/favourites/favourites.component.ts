import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { Favourite, DataService } from '../../data.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  house : object
  houseCharacters : object = {}
  characters : Array<any>
  spells : Array<any>
  local : Favourite
  empty : boolean
  emptyHouse : boolean
  emptyCharacters : boolean
  emptySpells : boolean

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getFavourite()
    this.emptyHouse = this.local.house == "" ? true : false
    this.emptyCharacters = this.local.characters.length == 0 ? true : false
    this.emptySpells = this.local.spells.length == 0 ? true : false
    if (!this.emptyHouse) this.getHouse()
    this.empty = this.emptyHouse && this.emptyCharacters && this.emptySpells ? true : false
  }

  getHouse() : void {
    this.api.getHouse(this.local.house).subscribe((data : object) => {
      this.house = data[0]
      this.getCharactersNames()
    }) 
  }

  getCharactersNames() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      data.forEach((character) => {
        if (character.house == this.house["name"]) this.houseCharacters[character._id] = character.name
      })
    })
  }

  removeHouse(id : string) : void {
    this.local.house = this.storage.removeFavourite("house", id).house
  }

  checkHouse(id : string) : boolean {
    return this.local.house == id
  }

  checkHouseCharacters(id : string) : boolean {
    return id in this.houseCharacters
  }
}