import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  character : object
  local : object
  id : string
  exists : boolean

  constructor(private api : ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(res => this.id = res.id)
    this.getCharacter()
  }

  getCharacter() : void {
    this.api.getCharacter(this.id).subscribe((data : object) => {
      if (data.hasOwnProperty('message')) this.exists = false
      else {
        this.character = data
        this.exists = true
      }
    })
  }

  addCharacter() : void {
    this.local = this.character
  }

  removeCharacter() : void {
    this.local = undefined
  }

  checkCharacter() : boolean {
    return typeof this.local !== 'undefined'
  }

  houseLink() : string {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name == this.character["house"]) return "house/" + data[i]._id
      }
    })
    return ""
  }
}