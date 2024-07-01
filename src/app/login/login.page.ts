import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms'
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
  MenuController,
} from '@ionic/angular/standalone'
import { AuthService } from '../services/auth.service'
import { addIcons } from 'ionicons'
import { logoGoogle } from 'ionicons/icons'
import { Router } from '@angular/router'

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
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup
  #formBuilder = inject(UntypedFormBuilder)
  #menuController = inject(MenuController)
  #router = inject(Router)
  #authService = inject(AuthService)

  constructor() {
    addIcons({ logoGoogle })
    this.loginForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    console.log('')
  }

  /**
   * Lifecycle hook called when the view has entered.
   * Disable the navigation menu
   */
  ionViewWillEnter() {
    this.#menuController.enable(false)
  }

  login() {
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value
      this.#authService.login(email, password).subscribe({
        next: (res) => {
          this.#router.navigateByUrl('dashboard', { replaceUrl: true })
          console.log(res)
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }

  /**
   * Navigate to the sign-up page
   */
  signUpAction() {
    this.#router.navigateByUrl('sign-up')
  }

  signInWithGoogle() {
    this.#authService.signInWithGoogle()
  }
}
