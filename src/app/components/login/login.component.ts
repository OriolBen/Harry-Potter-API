import { Component, OnInit, NgZone } from '@angular/core'
import { AuthenticationService } from '../../services/authentication.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email : string = ""
  password : string = ""

  constructor(private ngZone: NgZone, private authService : AuthenticationService, private router : Router, private snackBar : MatSnackBar) {}

  ngOnInit() {
    this.authService.afAuth.auth.onAuthStateChanged((user) => {
      if (user != null) {
        this.snackBar.open("You are logged in", "", { duration: 3000 })
        this.ngZone.run(() => this.router.navigate([""]))
      }
    })
  }
}