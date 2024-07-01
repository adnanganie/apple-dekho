import { Injectable, inject } from '@angular/core'
import { ToastController } from '@ionic/angular/standalone'
import { Enums } from './enums'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastController = inject(ToastController)
  async showToast(
    message: string,
    toastType: Enums.ToastType = Enums.ToastType.Neutral,
    toastPosition: Enums.ToastPosition = Enums.ToastPosition.Bottom,
    duration: number = 2000
  ) {
    let color = 'success'
    switch (toastType) {
      case Enums.ToastType.Success:
        color = 'success'
        break
      case Enums.ToastType.Warning:
        color = 'warning'
        break
      case Enums.ToastType.Error:
        color = 'danger'
        break
    }

    const toast = await this.toastController.create({
      message,
      duration,
      mode: 'ios',
      color: color,
      position: toastPosition,
    })
    toast.present()
  }
}
