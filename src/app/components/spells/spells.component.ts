import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []

  constructor(private api : ApiServiceService) {}

  ngOnInit() {
  }

  getAllSpells() : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = data
    })
  }
}