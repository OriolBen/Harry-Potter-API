import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit {
  characters : Array<any> = []

  constructor(private api : ApiServiceService) {}

  ngOnInit() {
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }
}