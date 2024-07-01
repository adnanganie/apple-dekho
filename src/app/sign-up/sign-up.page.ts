import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonButtons,
  IonInput,
} from '@ionic/angular/standalone'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonButtons,
    IonBackButton,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class SignUpPage implements OnInit {
  signupForm!: FormGroup
  #formBuilder = inject(FormBuilder)
  #authService = inject(AuthService)
  #router = inject(Router)

  constructor() {}

  ngOnInit() {
    this.signupForm = this.#formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  /**
   * Handles the signup action when the user submits the signup form.
   *
   * This method checks if the signup form is valid. If the form is valid, it extracts
   * the email, password, and userName values from the form and calls the signup method
   * of the authService to perform the signup operation. It subscribes to the observable
   * returned by the signup method to handle the response or any potential errors.
   */
  signupAction() {
    if (this.signupForm?.valid) {
      const { email, password, userName } = this.signupForm.value
      this.#authService.signup(email, password, userName).subscribe({
        next: (res) => {
          console.log(res)
          this.#router.navigateByUrl('dashboard')
        },
        error: (error) => {
          console.log(error)
        },
      })
    }
  }
}
