import { Injectable, OnInit, Signal, computed, inject } from '@angular/core'
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore'
import { Observable, pipe } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service'
import { Box } from '../models/box.model'

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private userId: string | null
  private firestore = inject(Firestore)
  private authService = inject(AuthService)

  constructor() {
    this.userId = computed(() => this.authService.user$()?.uid || null)()
  }
  /**
   * Save data in user's boxes sub-collection
   * @param data
   * @returns
   */
  saveBoxData(request: Box) {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxesRef = collection(this.firestore, `users/${this.userId}/boxes`)
    return addDoc(boxesRef, request)
  }

  /**
   * Get all boxes for the authenticated user
   * @returns
   */
  getBoxes(): Observable<Box[]> {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxesRef = collection(this.firestore, `users/${this.userId}/boxes`)
    return collectionData(boxesRef, { idField: 'id' }) as Observable<Box[]>
  }

  /**
   * Get a specific box by ID
   * @param id
   * @returns
   */
  getBoxById(id: string): Observable<Box> {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxRef = doc(this.firestore, `users/${this.userId}/boxes/${id}`)
    return docData(boxRef, { idField: 'id' }) as Observable<Box>
  }

  /**
   * Remove a box by ID
   * @param id
   * @returns
   */
  removeBox(id: string) {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxRef = doc(this.firestore, `users/${this.userId}/boxes/${id}`)
    return deleteDoc(boxRef)
  }

  /**
   * Update a box
   * @param box
   * @returns
   */
  updateBox(box: Box) {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxRef = doc(this.firestore, `users/${this.userId}/boxes/${box.id}`)
    return updateDoc(boxRef, {
      khata: box.khata,
      variety: box.variety,
      grade: box.grade,
      lotNumber: box.lotNumber,
      totalBoxes: box.totalBoxes,
    })
  }

  getTotalBoxesAndGrades(): Observable<{
    totalBoxes: number
    totalGrade5: number
    totalGrade4: number
  }> {
    if (!this.userId) {
      throw new Error('User not authenticated')
    }
    const boxesRef = collection(this.firestore, `users/${this.userId}/boxes`)
    const data = collectionData(boxesRef, { idField: 'id' }) as Observable<
      Box[]
    >
    return data.pipe(
      map((boxes) => {
        console.log('Boxes Data:', boxes)
        const totalBoxes = boxes.reduce((sum, box) => sum + box.totalBoxes, 0)
        const totalGrade5 = boxes
          .filter((box) => box.grade === '5')
          .reduce((sum, box) => sum + box.totalBoxes, 0)
        const totalGrade4 = boxes
          .filter((box) => box.grade === '4')
          .reduce((sum, box) => sum + box.totalBoxes, 0)
        return { totalBoxes, totalGrade5, totalGrade4 }
      })
    )
  }
}
