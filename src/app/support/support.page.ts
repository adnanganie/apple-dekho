import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class SupportPage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  message: string = '';

  constructor() {}

  sendSupportRequest() {
    // Send support request logic here
    console.log('Support request sent:', {
      name: this.userName,
      email: this.userEmail,
      message: this.message,
    });
  }

  ngOnInit() {}
}
