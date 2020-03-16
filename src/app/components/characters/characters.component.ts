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
  local : Array<string>
  name : string = ""
  search : boolean = false

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getCharacters()
    this.getAllCharacters()
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
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

   house() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == this.character["house"]) this.link = data[i]._id
      }
    })
  }
}