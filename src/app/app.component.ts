import { CommonModule } from '@angular/common'
import { Component, Signal, computed, inject } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  Platform,
  AlertController,
  MenuController,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { User } from './models/user.model'

import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  person,
  informationCircle,
  lockClosed,
  documentText,
  helpCircle,
  helpCircleOutline,
  documentTextOutline,
  personOutline,
  informationCircleOutline,
  lockClosedOutline,
  logOutOutline,
  logOutSharp,
} from 'ionicons/icons'
import { AuthService } from './services/auth.service'
import { Storage } from '@ionic/storage-angular'
import { StorageService } from './services/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'About Us', url: '/about-us', icon: 'information-circle' },
    { title: 'Privacy Policy', url: '/privacy-policy', icon: 'lock-closed' },
    {
      title: 'Terms & Conditions',
      url: '/terms-conditions',
      icon: 'document-text',
    },
    { title: 'Support', url: '/support', icon: 'help-circle' },
  ]
  public labels = ['Logout']

  user$: Signal<User | null> = this.authService.user$

  email: string | null = null
  name: string | null = null

  alertController = inject(AlertController)
  #menuController = inject(MenuController)

  constructor(
    private storage: Storage,
    private platform: Platform,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      person,
      informationCircle,
      lockClosed,
      documentText,
      helpCircle,
      helpCircleOutline,
      documentTextOutline,
      personOutline,
      informationCircleOutline,
      lockClosedOutline,
      logOutOutline,
      logOutSharp,
    })
    this.initializeApp()

    this.email = computed(() => this.authService.user$()?.email || null)()
    this.name = computed(() => this.authService.user$()?.name || null)()
  }

  /**
   * Initialize the app
   */
  async initializeApp() {
    await this.storage.create()
    this.platform.ready().then(async () => {
      const user = await this.storageService.get('user')
      if (user) {
        this.authService.userSignal.set(user)
      }
      this.authService.isAuthenticated().subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('login')
        } else {
          this.router.navigateByUrl('dashboard')
        }
      })
    })
  }

  /**
   * Initiates the logout action by presenting a confirmation dialog.
   */
  logoutAction() {
    this.presentLogOutDialog()
  }

  /**
   * Presents a confirmation dialog to the user to confirm logout action.
   * If the user confirms, the logout process is initiated.
   */
  async presentLogOutDialog() {
    const alert = await this.alertController.create({
      header: 'Confirm Log Out',
      message: 'Are you sure you want to logout from the application?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogout()
          },
        },
      ],
    })
    alert.present()
  }

  /**
   * Handles the logout process by closing the menu, logging out the user,
   * clearing the storage, and navigating to the login page.
   */
  async handleLogout() {
    this.#menuController.close()
    await this.authService.logOut().then(() => {
      this.storageService.clear()
      this.router.navigateByUrl('login', { replaceUrl: true })
    })
  }
}
