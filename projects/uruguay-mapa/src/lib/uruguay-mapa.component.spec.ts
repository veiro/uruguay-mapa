import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UruguayMapaPage } from './uruguay-mapa.page';

describe('UruguayMapaPage', () => {
  let component: UruguayMapaPage;
  let fixture: ComponentFixture<UruguayMapaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UruguayMapaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UruguayMapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
