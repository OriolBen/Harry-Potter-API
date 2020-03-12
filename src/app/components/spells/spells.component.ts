import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'
import { Favourite, DataService } from '../../data.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []
  local : Array<string>
  name : string = ""
  search : boolean = false

  constructor(private api : ApiService, private storage : DataService) {}

  ngOnInit() {
    this.local = this.storage.getSpells()
  }

  getAllSpells() : void {
    this.search = false
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = data
    })
  }

  getSpells(type) : void {
    this.search = false
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = []
      data.forEach((spell) => {
        if (spell.type == type) this.spells.push(spell)
      })
    })
  }

  searchSpells() : void {
    this.search = true
    this.api.getAllSpells().subscribe((data : Array<any>) => {
      this.spells = []
      data.forEach((spell) => {
        if (spell.spell.toLowerCase().includes(this.name)) this.spells.push(spell)
      })
    })
  }

  addSpell(id) : void {
    this.local = this.storage.addFavourite("Spells", id).spells
  }

  removeSpell(i) : void {
    this.local = this.storage.removeFavourite("Spells", i)
  }

  checkSpell(id) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i] == id) return true
    }
    return false
  }
}