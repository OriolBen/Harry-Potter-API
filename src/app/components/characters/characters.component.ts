import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})

export class CharactersComponent implements OnInit {
  characters : Array<any> = []

  constructor(private api : ApiService) {}

  ngOnInit() {
  }

  getAllCharacters() : void {
    this.api.getAllCharacters().subscribe((data : Array<any>) => {
      this.characters = data
    })
  }
}