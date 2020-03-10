import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})

export class HouseComponent implements OnInit {
  house : Array<any> = []

  constructor(private api : ApiServiceService) {}

  ngOnInit() {
  }

  getHouse(houseID) : void {
    this.api.getHouse(houseID).subscribe((data : Array<any>) => {
      this.house = data
    })
  }
}