import { Injectable } from '@angular/core'
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { LoadingComponent } from '../components/loading/loading.component'
import { Observable, Subject } from 'rxjs'
import { mapTo, scan, map, mergeMap } from 'rxjs/operators'

@Injectable()
export class LoadingService {
  spinnerRef : OverlayRef = this.cdkSpinnerCreate()
  spin : Subject<boolean> = new Subject()
  state : boolean = false
  storage : boolean = false
  api : boolean = false
  authentication : boolean = false

  constructor(private overlay: Overlay) {
    this.spin.asObservable().pipe(
      map(val => val ? 1 : -1 ),
      scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
    ).subscribe((res) => {
      if (res === 1) this.showSpinner()
      else if (res == 0) this.spinnerRef.hasAttached() ? this.stopSpinner() : null;
    })
  }

  cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })
  }

  showSpinner() : void {
    this.spinnerRef.attach(new ComponentPortal(LoadingComponent))
  }

  stopSpinner() : void {
    this.spinnerRef.detach();
  }

  set(variable : string, value : boolean) {
    switch (variable) {
      case "storage":
        this.storage = value
        break
      case "api":
        this.api = value
        break
      case "authentication":
        this.authentication = value
        break
    }
    this.check()
  }

  check() : void {
    let bool : boolean = this.storage || this.api || this.authentication
    if (this.state != bool) {
      this.state = bool
      this.spin.next(this.state)
    }
  }
}