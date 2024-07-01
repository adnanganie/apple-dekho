import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BoxListPage } from './box-list.page'

describe('BoxListPage', () => {
  let component: BoxListPage
  let fixture: ComponentFixture<BoxListPage>

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxListPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
