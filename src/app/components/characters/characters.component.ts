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
  houses : Array<string> = []
  local : Array<string>
  name : string = ""
  search : boolean = false

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getCharacters()
    this.getAllCharacters()
    this.getHousesId()
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }

  getHousesId() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      data.forEach((house) => {
        this.houses.push(house._id)
      })
    })
    console.log(this.houses)
  }

  check(value : string) : boolean {
    return typeof value !== 'undefined'
  }

  searchCharacters() : void {
    if (this.name != "") {
      this.search = true
      this.api.getAllCharacters().subscribe((data : Array<any>) => {
        this.characters = []
        data.forEach((character) => {
          if (character.name.toLowerCase().includes(this.name.toLowerCase())) this.characters.push(character)
        })
      })
    }
  }

  addCharacter(id : string) : void {
    this.local = this.storage.addFavourite("Characters", id).characters
  }

  removeCharacter(id : string) : void {
    this.local = this.storage.removeFavourite("Characters", id).characters
  }

  checkCharacter(id : string) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == id) return true
    }
    return false
  }

  house() : string {
    let link = "test"
    return link
  }
}