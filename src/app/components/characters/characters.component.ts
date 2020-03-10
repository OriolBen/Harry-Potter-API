import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }
}