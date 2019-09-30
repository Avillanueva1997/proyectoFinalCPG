import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasPage } from './salas.page';

describe('SalasPage', () => {
  let component: SalasPage;
  let fixture: ComponentFixture<SalasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
