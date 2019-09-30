import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistentesPage } from './asistentes.page';

describe('AsistentesPage', () => {
  let component: AsistentesPage;
  let fixture: ComponentFixture<AsistentesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistentesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
