import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTransportsComponent } from './available-transports.component';

describe('AvailableTransportsComponent', () => {
  let component: AvailableTransportsComponent;
  let fixture: ComponentFixture<AvailableTransportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableTransportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableTransportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
