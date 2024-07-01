import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddBoxPage } from './add-box.page'

describe('AddBoxPage', () => {
  let component: AddBoxPage
  let fixture: ComponentFixture<AddBoxPage>

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoxPage)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
