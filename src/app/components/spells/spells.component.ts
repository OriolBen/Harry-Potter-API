import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../api.service'

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css']
})

export class SpellsComponent implements OnInit {
  spells : Array<any> = []
  local : Array<any> = []

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

  addSpell(spell) : void {
    this.local.push(spell)
  }

  removeSpell(id) : void {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i]._id == id) {
        this.local.splice(i, 1)
        break
      }
    }
  }

  checkSpell(id) : boolean {
    for (var i = 0; i < this.local.length; i++) {
      if (this.local[i]._id == id) return true
    }
    return false
  }

  // https://stackblitz.com/edit/5-dam-dataservice?embed=1&file=app/app.component.ts
}