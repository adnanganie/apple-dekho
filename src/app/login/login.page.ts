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
import { ToastService } from '../utils/toast.service'
import { LoadingService } from '../utils/loading.service'
import { Enums } from '../utils/enums'

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
  #authService = inject(AuthService)
  toastService = inject(ToastService)
  loadingService = inject(LoadingService)
  #router = inject(Router)

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

  async login() {
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value
      await this.loadingService.presentLoading('Logging in...')
      this.#authService.login(email, password).subscribe({
        next: () => {
          this.#router.navigateByUrl('dashboard', { replaceUrl: true })
        },
        error: (error) => {
          this.toastService.showToast('Login failed', Enums.ToastType.Error)
          console.error(error)
        },
        complete: async () => {
          await this.loadingService.dismissLoading()
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

  async signInWithGoogle() {
    await this.loadingService.presentLoading('Signing in with Google...')
    this.#authService.signInWithGoogle2().subscribe({
      next: () => {
        this.#router.navigateByUrl('dashboard', { replaceUrl: true })
        this.toastService.showToast('Google sign-in successful')
      },
      error: (error) => {
        this.toastService.showToast(
          'Google sign-in failed',
          Enums.ToastType.Error
        )
        console.error(error)
      },
      complete: async () => {
        await this.loadingService.dismissLoading()
      },
    })
  }
}
