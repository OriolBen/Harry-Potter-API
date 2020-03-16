import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { DataService } from '../../data.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  character : object
  local : Array<string>
  id : string
  exists : boolean
  link : string

  constructor(private api : ApiService, private storage : DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(res => this.id = res.id)
    this.local = this.storage.getCharacters()
    this.getCharacter()
  }

  getCharacter() : void {
    this.api.getCharacter(this.id).subscribe((data : object) => {
      if (data.hasOwnProperty('message')) this.exists = false
      else {
        this.character = data
        this.exists = true
        if (typeof this.character["house"] !== 'undefined') this.house()
      }
    })
  }

  check(value : string) : boolean {
    return typeof value !== 'undefined'
  }

  addCharacter() : void {
    this.local = this.storage.addFavourite("Characters", this.id).characters
  }

  removeCharacter() : void {
    this.local = this.storage.removeFavourite("Characters", this.id).characters
  }

  checkCharacter() : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == this.id) return true
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