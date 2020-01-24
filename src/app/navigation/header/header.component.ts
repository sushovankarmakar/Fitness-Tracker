import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;

  @ViewChild("matButton", { static: false }) matButton;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
        //authStatus is true if an user is logged in, false if logged out
      }
    );

    //after subscribing to an observalbe, we need to unsubscibe to it also when we don't need it anymore.
  }

  onToggleSideNav() {
    this.sidenavToggle.emit();
    this.matButton._elementRef.nativeElement.blur();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
