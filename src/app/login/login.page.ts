import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonCardContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonInput,
} from '@ionic/angular/standalone';
import { AuthService } from './auth.service';
import { addIcons } from 'ionicons';
import { logoGoogle } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonIcon,
    IonButton,
    IonLabel,
    IonCardContent,
    IonItem,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  private formBuilder = Inject(FormBuilder);
  //private authService = Inject(AuthService);
  email: string | null = null;
  password: string | null = null;

  constructor(private authService: AuthService) {
    addIcons({ logoGoogle });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
