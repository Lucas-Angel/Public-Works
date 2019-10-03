import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaObrasPage } from './mapa-obras.page';

describe('MapaObrasPage', () => {
  let component: MapaObrasPage;
  let fixture: ComponentFixture<MapaObrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapaObrasPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaObrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
