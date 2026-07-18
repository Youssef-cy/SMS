import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/service/auth-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslatePipe } from '../../core/service/translate.pipe';
import { TranslationService } from '../../core/service/translation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translationService = inject(TranslationService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;
  isLoading = false;

  get currentLang() {
    return this.translationService.currentLang();
  }

  submit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      this.authService.authenticate({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      }).subscribe({
        next: (value) => {
          this.isLoading = false;
          console.log(value);
          Swal.fire({
            title: this.translationService.translate('Done!'),
            text: this.translationService.translate('Your action has been completed successfully.'),
            icon: 'success',
            confirmButtonText: this.translationService.translate('OK'),
          });
          localStorage.setItem('token', value.token);
          localStorage.setItem('role', value.role);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status !== 401 && err.status !== 403) {
            console.error('Login error:', err);
          } else {
            console.warn('Login failed:', err.message);
          }
          
          let rawError = 'Something went wrong. Please try again.';
          if (err.status === 401) {
            rawError = 'The username or password you entered is incorrect. Please double-check your spelling and try again.';
          } else if (err.status === 0) {
            rawError = 'Something went wrong with your request please check your internet.';
          } else if (err.status === 500) {
            rawError = 'Unexpected error — please try again later';
          } else if (err.error && typeof err.error === 'string') {
            rawError = err.error;
          } else if (err.error && err.error.message) {
            rawError = err.error.message;
          }
          
          this.errorMessage = this.translationService.translate(rawError);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isEn(): boolean {
    return this.currentLang === 'en';
  }

  isAr(): boolean {
    return this.currentLang === 'ar';
  }

  toggleLanguage(lang: 'en' | 'ar'): void {
    this.translationService.setLanguage(lang);
  }
}
