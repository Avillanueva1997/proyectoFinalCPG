import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresPage } from './indicadores.page';

describe('IndicadoresPage', () => {
  let component: IndicadoresPage;
  let fixture: ComponentFixture<IndicadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
