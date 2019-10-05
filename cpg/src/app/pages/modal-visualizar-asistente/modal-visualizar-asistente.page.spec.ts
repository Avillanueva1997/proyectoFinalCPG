import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarAsistentePage } from './modal-visualizar-asistente.page';

describe('ModalVisualizarAsistentePage', () => {
  let component: ModalVisualizarAsistentePage;
  let fixture: ComponentFixture<ModalVisualizarAsistentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarAsistentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarAsistentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
