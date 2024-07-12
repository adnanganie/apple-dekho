import { CommonModule } from '@angular/common'
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { IonIcon, IonButton } from '@ionic/angular/standalone'

@Component({
  selector: 'app-empty-view',
  template: `
    <div
      [ngClass]="
        isCenteredVertically
          ? 'empty-view-container'
          : 'empty-view-container-non-centered'
      "
      [ngStyle]="{ top: topPosition }"
    >
      <ion-icon
        [color]="iconColor"
        [src]="icon"
        [name]="icon"
        class="empty-view-image"
      ></ion-icon>
      <div class="empty-view-title">{{ title }}</div>
      <ion-button
        *ngIf="!hideRefreshButton"
        shape="round"
        (click)="handleButtonClick()"
        mode="ios"
      >
        {{ buttonTitle }}
      </ion-button>
    </div>
  `,
  styleUrls: ['./empty-view.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, CommonModule],
})
export class EmptyViewComponent implements OnInit {
  @Input() icon: string = ''
  @Input() title: string = 'No Data Found'
  @Input() hideRefreshButton = false
  @Input() buttonTitle = 'Refresh'
  @Input() isCenteredVertically = true
  @Input() topPosition: string = ''
  @Input() iconColor?: string

  @Output() buttonClicked = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {}

  handleButtonClick() {
    this.buttonClicked.emit()
  }
}

export enum EmptyViewButtonType {
  Refresh,
  Navigator,
}
