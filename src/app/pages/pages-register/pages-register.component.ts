import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterDto } from 'src/app/models/Dtos/User/RegisterDto';
import { AuthService } from 'src/app/services/auth.service';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css'],
})
export class PagesRegisterComponent extends FormComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    super();

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl(
        '',
        [Validators.required],
        [this.checkUsername()]
      ),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.checkEmail()]
      ),
      password: new FormControl('', [Validators.required]),
      agreeOnTerms: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['/dashboard']);
    }
  }

  checkEmail(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      this.auth.isEmailAvailable(control.value).pipe(
        map((isAvailable) => {
          return isAvailable ? null : { emailTaken: true };
        })
      );
  }

  checkUsername(): AsyncValidatorFn {
    return (control: AbstractControl) =>
      this.auth.isUserNameAvailable(control.value).pipe(
        map((isAvailable) => {
          return isAvailable ? null : { usernameTaken: true };
        })
      );
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user = <RegisterDto>{};
    user.email = this.form.get('email')?.value;
    user.name = this.form.get('name')?.value;
    user.password = this.form.get('password')?.value;
    user.username = this.form.get('username')?.value;

    this.auth.register(user).subscribe((response) => {
      if (response.ok) {
        this.router.navigate(['/pages-login']);
        this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
