import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []

  constructor(private api : ApiService) {}

  ngOnInit() {
  }

  getAllSpells() : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = data
    })
  }

  getSpells(type) : void {
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = []
      data.forEach((spell) => {
        if (spell.type == type) this.spells.push(spell)
      })
    })
  }
}