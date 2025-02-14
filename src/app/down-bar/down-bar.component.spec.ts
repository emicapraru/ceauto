/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DownBarComponent } from './down-bar.component';

describe('DownBarComponent', () => {
  let component: DownBarComponent;
  let fixture: ComponentFixture<DownBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
