import { Inject, Injectable, InjectionToken } from '@angular/core'
import { AuthenticationService } from './authentication.service'
import { AngularFireDatabase } from '@angular/fire/database'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoadingService } from './loading.service'

export const LOCAL_DATA = new InjectionToken<Storage>('Local Data', {
  providedIn: 'root',
  factory: () => localStorage
})

export interface Favourite {
  house : string,
  characters : Array<string>,
  spells : Array<string>
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  local : Favourite = {
    "house": "",
    "characters": [],
    "spells": []
  }
  online : Favourite = {
    "house": "",
    "characters": [],
    "spells": []
  }

  constructor(@Inject(LOCAL_DATA) public data : Storage, private db : AngularFireDatabase, public authentication : AuthenticationService, private loading : LoadingService) {
    this.loading.set("storage", true)
    let exists = this.data.getItem('Harry Potter API')
    if (exists) this.local = JSON.parse(exists)
    this.authentication.afAuth.auth.onAuthStateChanged((user) => {
      if (user != null) this.setFavouriteOnline()
      this.loading.set("storage", false)
    })
  }

  getFavouriteLocal() : Favourite {
    return this.local
  }

  getFavouriteOnline() : Observable<any> {
    return this.db.list(this.authentication.userDetails.uid).valueChanges()
  }

  setFavouriteOnline() : void {
    this.getFavouriteOnline().subscribe((data) => {
      console.log("SET")
      if (data[0] != "") this.online.characters = Object.values(data[0])
      this.online.house = data[1]
      if (data[2] != "") this.online.spells = Object.values(data[2])
    })
  }

  addFavouriteLocal(category : string, id : string) : void {
    this.loading.set("storage", true)
    switch (category) {
      case "house":
        this.local.house = id
        break
      default:
        this.local[category].push(id)
        break
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.local))
    this.loading.set("storage", false)
  }

  addFavouriteOnline(category : string, id : string) : void {
    this.loading.set("storage", true)
    switch (category) {
      case "house":
        this.db.database.ref(this.authentication.userDetails.uid).update({
          house: id
        }).then(() => {
          this.online.house = id
          this.loading.set("storage", false)
        })
        break
      default:
        this.db.database.ref(this.authentication.userDetails.uid + "/" + category).update({
          [id]: id
        }).then(() => this.loading.set("storage", false))
        break
    }
  }

  removeFavouriteLocal(category : string, id : string) : void {
    this.loading.set("storage", true)
    switch (category) {
      case "house": 
        this.local.house = ""
        break
      default:
        for (let i = 0; i < this.local[category].length; i++) {
          if (this.local[category][i] == id) this.local[category].splice(i, 1)
        }
        break
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.local))
    this.loading.set("storage", false)
  }

  removeFavouriteOnline(category : string, id : string) : void {
    this.loading.set("storage", true)
    switch (category) {
      case "house": 
        this.db.database.ref(this.authentication.userDetails.uid).update({
          house: ""
        }).then(() => this.loading.set("storage", false))
        break
      default:
        if (this.online[category].length != 1) this.db.database.ref(this.authentication.userDetails.uid + "/" + category + "/" + id).remove().then(() => this.loading.set("storage", false))
        else this.db.database.ref(this.authentication.userDetails.uid).update({
          [category]: ""
        }).then(() => {
          this.setFavouriteOnline()
          this.loading.set("storage", false)
        })
        break
    }
  }

  upload() : void {
    this.loading.set("storage", true)
    let characters = this.local.characters.reduce(function(o, val) {
      o[val] = val
      return o
    }, {})
    let spells = this.local.spells.reduce(function(o, val) {
      o[val] = val
      return o
    }, {})
    this.db.database.ref(this.authentication.userDetails.uid).set({
      house: this.local.house,
      characters: characters,
      spells: spells,
    }).then(() => this.loading.set("storage", false))
  }
}