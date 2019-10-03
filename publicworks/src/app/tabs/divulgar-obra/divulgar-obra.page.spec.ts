import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivulgarObraPage } from './divulgar-obra.page';

describe('DivulgarObraPage', () => {
  let component: DivulgarObraPage;
  let fixture: ComponentFixture<DivulgarObraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DivulgarObraPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivulgarObraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
