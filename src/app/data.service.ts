import { Inject, Injectable, InjectionToken } from '@angular/core'

export const LOCAL_DATA = new InjectionToken<Storage>('Local Data', {
  providedIn: 'root',
  factory: () => localStorage
})

export interface Favourite {
  house : string,
  characters : Array<string>,
  spells : Array<string>,
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  favourite : Favourite

  constructor(@Inject(LOCAL_DATA) public data : Storage) {
    let exists = this.data.getItem('Harry Potter API')
    if (!exists) {
      this.favourite = {
        "house": "",
        "characters": [],
        "spells": []
      }
    }
    else this.favourite = JSON.parse(exists)
  }

  getFavourite() : Favourite {
    return this.favourite
  }
  
  getSpells() : Array<string> {
    return this.favourite.spells
  }

  addFavourite(category : string, id : string) : Favourite {
    switch (category) {
      case "House": this.favourite.house = id
      case "Characters": this.favourite.characters.push(id)
      case "Spells": this.favourite.spells.push(id)
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
    return this.favourite
  }

  /*
  updatefavourite(category : string, id : string) : void {
    switch (category) {
      case "House": this.favourite.house = id
      case "Characters": this.favourite.characters.push(id)
      case "Spells": this.favourite.spells.push(id)
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
  }
  */
}