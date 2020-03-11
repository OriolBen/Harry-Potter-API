import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  character : Array<any> = []

  constructor(private api : ApiService) {}

  ngOnInit() {
  }

  getCharacter() : void {
    this.api.getCharacter(this.characterID).subscribe((data : Array<any>) => {
      this.character = data
    })
  }
}