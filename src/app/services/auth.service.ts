import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core'
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from '@angular/fire/auth'
import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { StorageService } from './storage.service'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSignal: WritableSignal<User | null> = signal<User | null>(null)
  get user$(): Signal<User | null> {
    return this.userSignal
  }

  #storageService = inject(StorageService)
  private firebaseAuth = inject(Auth)
  private googleAuthProvider = new GoogleAuthProvider()

  /**
   * API calls for login
   * @param email
   * @param password
   * @returns
   */
  login(email: string, password: string): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
    ).pipe(
      map((userCredential) => {
        const {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          photoURL,
          uid,
          metadata,
        } = userCredential.user
        const userInfo: User = {
          uid: uid,
          name: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          createdAt: metadata.creationTime,
          lastLoginAt: metadata.lastSignInTime,
        }
        this.userSignal.set(userInfo)
        this.#storageService.set('user', userInfo)
        return userCredential
      })
    )
  }

  getProfile(): Promise<User> {
    return this.#storageService.get('user')
  }

  isAuthenticated(): Observable<boolean> {
    return from(this.#storageService.get('user')).pipe(map((user) => !!user))
  }

  signup(email: string, password: string, userName: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((response) =>
      updateProfile(response.user, { displayName: userName })
    )
    return from(promise)
  }

  signInWithGoogle() {
    signInWithPopup(this.firebaseAuth, this.googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  async resetPassword(email: string) {
    return await sendPasswordResetEmail(this.firebaseAuth, email)
  }

  async getProfile2(): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      onAuthStateChanged(
        this.firebaseAuth,
        (user) => {
          if (user) {
            resolve(user as User)
          } else {
            resolve(null)
          }
        },
        reject
      )
    })
  }

  logOut() {
    signOut(this.firebaseAuth)
      .then(() => {})
      .catch((err) => console.log(err))
  }
}
