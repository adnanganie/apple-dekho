import { Component, OnInit, inject } from '@angular/core'
import { CommonModule, Location } from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  SelectChangeEventDetail,
  IonList,
  IonButton,
  IonTextarea,
  IonToast,
} from '@ionic/angular/standalone'
import { IonSelectCustomEvent } from '@ionic/core'
import { BoxService } from '../services/box.service'
import { Box } from '../models/box.model'
import { ToastService } from '../utils/toast.service'
import { Enums } from '../utils/enums'
import { LoadingService } from '../utils/loading.service'

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.page.html',
  styleUrls: ['./add-box.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonTextarea,
    IonButton,
    IonList,
    IonItem,
    IonInput,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class AddBoxPage implements OnInit {
  myForm: FormGroup

  formBuilder = inject(FormBuilder)
  boxService = inject(BoxService)
  #location = inject(Location)
  #toastService = inject(ToastService)
  #loadingService = inject(LoadingService)

  constructor() {
    this.myForm = this.formBuilder.group({
      fruit: ['', Validators.required],
      variety: ['', Validators.required],
      grade: ['', Validators.required],
      khata: ['', [Validators.required, Validators.minLength(3)]],
      lotNumber: ['', Validators.required],
      totalBoxes: ['', Validators.required],
      note: [''],
    })
  }

  ngOnInit() {}

  handleChange($event: IonSelectCustomEvent<SelectChangeEventDetail<any>>) {}

  handleCancel() {}
  handleDismiss() {}

  /**
   * API calls for saving a data
   */
  async saveButtonAction() {
    if (this.myForm.valid) {
      await this.#loadingService.presentLoading('Saving data...')
      try {
        await this.boxService.saveBoxData(this.myForm.value)
        this.#toastService.showToast('Data saved successfully')
        this.myForm.reset()
        this.#location.back()
      } catch (error) {
        this.#toastService.showToast(
          'Error saving form data',
          Enums.ToastType.Error
        )
        console.error('Error saving form data:', error)
      } finally {
        await this.#loadingService.dismissLoading()
      }
    } else {
      this.#toastService.showToast('Form is invalid', Enums.ToastType.Error)
    }
  }
}
