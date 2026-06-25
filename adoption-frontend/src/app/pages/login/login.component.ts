import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  motDePasse: string = '';
  showPassword: boolean = false;

  constructor(private router: Router,
     private authService: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

 onSubmit() {
  if (!this.email || !this.motDePasse) {
    return;
  }

  this.authService.loginStaff(this.email, this.motDePasse).subscribe({
    next: () => {
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Erreur connexion :', err);
    }
  });
}
  
 
}