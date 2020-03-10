import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})

export class HousesComponent implements OnInit {
  houses : Array<any> = []

  constructor(private api : ApiServiceService) {}

  ngOnInit() {
  }

  getAllHouses() : void {
    this.api.getAllHouses().subscribe((data : Array<any>) => {
      this.houses = data
    }) 
  }
}