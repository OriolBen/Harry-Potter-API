import { Component } from '@angular/core'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector : 'my-app',
  templateUrl : './app.component.html',
  styleUrls : [ './app.component.css' ]
})

export class AppComponent  {
  faCoffee = faCoffee;
}
