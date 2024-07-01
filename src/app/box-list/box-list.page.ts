import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonListHeader,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { add, chevronForward, createOutline, trash } from 'ionicons/icons'
import { Router } from '@angular/router'
import { BoxService } from '../services/box.service'
import { Box } from '../models/box.model'

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.page.html',
  styleUrls: ['./box-list.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonListHeader,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonNote,
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonBackButton,
    IonFabButton,
    IonFab,
    IonButtons,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenuButton,
    IonThumbnail,
  ],
})
export class BoxListPage implements OnInit {
  isLoading: boolean = false
  #router = inject(Router)
  boxService = inject(BoxService) // Inject the BoxService
  boxes: Box[] = [] // Local variable to store fetched boxes

  constructor() {
    addIcons({
      chevronForward,
      createOutline,
      trash,
      add,
    })
  }

  ngOnInit() {
    this.fetchBoxList()
  }

  /**
   * API calls for fetching box list
   */
  fetchBoxList() {
    this.isLoading = true
    this.boxService.getBoxes().subscribe({
      next: (data: Box[]) => {
        this.boxes = data
        console.log(data)

        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
        console.error('Error fetching boxes:', error)
      },
    })
  }

  /**
   * Navigate to add boxes page
   */
  fabAction() {
    this.#router.navigateByUrl('add-box')
  }
}
