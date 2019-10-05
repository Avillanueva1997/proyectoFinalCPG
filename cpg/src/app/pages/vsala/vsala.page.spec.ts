import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsalaPage } from './vsala.page';

describe('VsalaPage', () => {
  let component: VsalaPage;
  let fixture: ComponentFixture<VsalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
