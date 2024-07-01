import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
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
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
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
  public labels = [
    'Support',
    'Contact Us',
    'About Us',
    'Privacy Policy',
    'Terms & Conditions',
  ]

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
    })
    this.initializeApp()
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
        console.log('isAuthenticated', isAuthenticated)
        if (!isAuthenticated) {
          this.router.navigateByUrl('login')
        } else {
          this.router.navigateByUrl('dashboard')
        }
      })
    })
  }
}
