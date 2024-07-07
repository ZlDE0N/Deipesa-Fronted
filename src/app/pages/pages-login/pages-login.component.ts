import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent {
  constructor(private router: Router) {}

  redirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
