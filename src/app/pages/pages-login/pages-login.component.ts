import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/Dtos/User/LoginDto';
import { AuthService } from 'src/app/services/auth.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent extends FormComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    super();

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const loginRequest = <LoginDto>{
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    this.auth.login(loginRequest).subscribe((tokenDto) => {
      this.router.navigate(['/dashboard']);
    });
  }
}
