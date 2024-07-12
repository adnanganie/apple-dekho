import { Component, Input } from '@angular/core'
import {
  IonList,
  IonSkeletonText,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-skeleton-view',
  templateUrl: './skeleton-view.component.html',
  styleUrls: ['./skeleton-view.component.scss'],
  imports: [IonLabel, IonList, IonSkeletonText, IonItem],
  standalone: true,
})
export class SkeletonViewComponent {
  @Input() hasThumbnail = false
  @Input() skeletonSize = 10
  constructor() {}

  /**
   * Get length of skeleton view
   */
  getSkeleltonArray(): Array<number> {
    const skeletonArray = new Array<number>()
    for (let i = 0; i < this.skeletonSize; i++) {
      skeletonArray.push(i)
    }
    return skeletonArray
  }
}
