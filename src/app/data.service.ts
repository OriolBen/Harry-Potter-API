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

  getCharacters() : Array<string> {
    return this.favourite.characters
  }

  addFavourite(category : string, id : string) : Favourite {
    switch (category) {
      case "House": this.favourite.house = id
      case "Characters": this.favourite.characters.push(id)
      case "Spells": 
        console.log("Here")
        this.favourite.spells.push(id)
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
    return this.favourite
  }

  removeFavourite(category : string, id : string) : Favourite {
    switch (category) {
      case "House": this.favourite.house = id
      case "Characters": 
        for (var i = 0; i < this.favourite.characters.length; i++) {
          if (this.favourite.characters[i] == id) this.favourite.characters.splice(i, 1)
        }
      case "Spells":
        for (var i = 0; i < this.favourite.spells.length; i++) {
          if (this.favourite.spells[i] == id) this.favourite.spells.splice(i, 1)
        }
    }
    this.data.setItem('Harry Potter API', JSON.stringify(this.favourite))
    return this.favourite
  }
}