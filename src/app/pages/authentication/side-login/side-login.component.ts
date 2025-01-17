import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';  // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyC_z26euRKiV5BzNEiLBWQV_dFiHr8eQcI",
  authDomain: "angular-55556.firebaseapp.com",
  projectId: "angular-55556",
  storageBucket: "angular-55556.firebasestorage.app",
  messagingSenderId: "936166886825",
  appId: "1:936166886825:web:627a9ff7de1e6addf108b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule  // Add CommonModule here
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';

  constructor(private router: Router) {}

  get f() {
    return this.form.controls;
  }

  submit() {
    const { uname, password } = this.form.value;
  
    // Type guard to ensure both uname (email) and password are strings
    if (typeof uname === 'string' && typeof password === 'string') {
      signInWithEmailAndPassword(auth, uname, password)
        .then((userCredential) => {
          // User signed in
          console.log('User signed in', userCredential.user);

          // Store user info in sessionStorage
          const userSessionData = {
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            token: userCredential.user.refreshToken, // Store the user's refresh token or other necessary details
          };

          // Save to sessionStorage
          sessionStorage.setItem('user', JSON.stringify(userSessionData));

          // Redirect to home or dashboard
          this.router.navigate(['/']);
        })
        .catch((error) => {
          // Handle Errors here.
          this.errorMessage = error.message;
        });
    } else {
      this.errorMessage = 'Please provide a valid email and password.';
    }
  }
}
