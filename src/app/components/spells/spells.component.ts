import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { DataService } from '../../data.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []
  local : Array<string>
  name : string = ""

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getSpells()
    this.getAllSpells()
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

  searchSpells() : void {
    if (this.name != "") {
      this.api.getAllSpells().subscribe((data : Array<any>) => {
        this.spells = []
        data.forEach((spell) => {
          if (spell.spell.toLowerCase().includes(this.name.toLowerCase())) this.spells.push(spell)
        })
      })
    }
  }

  addSpell(id) : void {
    this.local = this.storage.addFavourite("Spells", id).spells
  }

  removeSpell(id) : void {
    this.local = this.storage.removeFavourite("Spells", id).spells
  }

  checkSpell(id) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == id) return true
    }
    return false
  }
}