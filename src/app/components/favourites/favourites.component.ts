import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { Favourite, DataService } from '../../data.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  houses : object
  characters : Array<any>
  spells : Array<any>
  local : Favourite
  empty : boolean = false

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getFavourite()
    console.log(this.local)
  }

}