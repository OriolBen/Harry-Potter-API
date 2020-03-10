import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})

export class CharacterComponent implements OnInit {
  character : Array<any> = []

  constructor(private api : ApiServiceService) {}

  ngOnInit() {
  }

  getCharacter() : void {
    this.api.getCharacter(this.characterID).subscribe((data : Array<any>) => {
      this.character = data
    })
  }
}