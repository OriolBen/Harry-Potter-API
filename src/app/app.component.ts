import { Component } from '@angular/core'
import { AuthenticationService } from './services/authentication.service'

@Component({
  selector : 'my-app',
  templateUrl : './app.component.html',
  styleUrls : [ './app.component.css' ]
})

export class AppComponent {
  message : string = ""

  constructor(public authService : AuthenticationService) {}

  logout(sidenav : any) : void {
    sidenav.toggle()
    this.authService.logout()
  }
}
