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
  RefresherEventDetail,
  IonFab,
  IonFabButton,
  IonMenu,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { add, cubeOutline, menu } from 'ionicons/icons'
import { IonRefresherCustomEvent } from '@ionic/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
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
  #router = inject(Router)
  constructor() {
    addIcons({
      cubeOutline,
      menu,
      add,
    })
  }

  ngOnInit() {}

  /**
   * Lifecycle hook called when the view has entered.
   * Enable the navigation menu
   */
  ionViewWillEnter() {
    this.#menuController.enable(true)
  }

  doRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {}

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
