import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonCard,
  IonAvatar,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonAvatar,
    IonCard,
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
export class ProfilePage implements OnInit {
  userName: string = 'John Doe'
  userEmail: string = 'johndoe@example.com'
  userBio: string = 'Fruit enthusiast and farmer.'

  constructor() {}

  saveProfile() {
    // Save profile logic here
    console.log('Profile saved:', {
      name: this.userName,
      email: this.userEmail,
      bio: this.userBio,
    })
  }
  ngOnInit(): void {}
}
