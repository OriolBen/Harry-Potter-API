import { Inject, Injectable, InjectionToken } from '@angular/core'

export const LOCAL_DATA = new InjectionToken<Storage>('Local Data', {
  providedIn: 'root',
  factory: () => localStorage
})

export interface Favourites {
  house : string
  characters : Array<string>
  spells : Array<string>
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  favourites : Favourites

  constructor(@Inject(LOCAL_DATA) public data : Storage) {
    let exists = this.data.getItem('Harry Potter API')
    if (!exists) {
      this.favourites = {
        "house": "",
        "characters": [],
        "spells": []
      }
    }
    else this.favourites = JSON.parse(exists)
  }

  updatefavourites(category : string, id : string) : void {
    switch (category) {
      case "House": this.favourites.house = id
      case "Characters": this.favourites.characters.push(id)
      case "Spells": this.favourites.spells.push(id)
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourites))
  }
}