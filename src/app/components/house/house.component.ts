import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {
  house : Array<any> = []

  constructor(private api : ApiService) {}

  ngOnInit() {
  }

  getHouse(id) : void {
    this.api.getHouse(id).subscribe((data : Array<any>) => {
      this.house = data
    })
  }
}