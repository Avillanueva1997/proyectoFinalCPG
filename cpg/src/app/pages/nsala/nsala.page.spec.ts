import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsalaPage } from './nsala.page';

describe('NsalaPage', () => {
  let component: NsalaPage;
  let fixture: ComponentFixture<NsalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
