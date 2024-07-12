import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  MenuController,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonCard,
  IonCol,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonMenu,
  RefresherCustomEvent,
  IonText,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { add, cubeOutline, menu } from 'ionicons/icons'
import { Router } from '@angular/router'
import { BoxService } from '../services/box.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonFabButton,
    IonFab,
    IonLabel,
    IonItem,
    IonCol,
    IonCard,
    IonRow,
    IonRefresherContent,
    IonRefresher,
    IonIcon,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
  ],
})
export class DashboardPage implements OnInit {
  #menuController = inject(MenuController)
  boxService = inject(BoxService)

  totalBoxes: number = 0
  totalGrade5: number = 0
  totalGrade4: number = 0
  #router = inject(Router)
  constructor() {
    addIcons({
      cubeOutline,
      menu,
      add,
    })
  }

  ngOnInit() {
    this.boxService.getTotalBoxesAndGrades().subscribe({
      next: (data) => {
        console.log('Aggregation Data:', data)
        this.totalBoxes = data.totalBoxes
        this.totalGrade5 = data.totalGrade5
        this.totalGrade4 = data.totalGrade4
      },
      error: (error) => {
        console.error('Error fetching box data:', error)
      },
    })
  }

  /**
   * Lifecycle hook called when the view has entered.
   * Enable the navigation menu
   */
  ionViewWillEnter() {
    this.#menuController.enable(true)
  }

  doRefresh(event: RefresherCustomEvent) {}

  cardAction() {
    this.#router.navigateByUrl('box-list')
  }
  /**
   * Navigate to add boxes page
   */
  fabAction() {
    this.#router.navigateByUrl('add-box')
  }
}
