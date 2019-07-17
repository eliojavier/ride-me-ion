import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTransportComponent } from './pickup-transport.component';

describe('PickupTransportComponent', () => {
  let component: PickupTransportComponent;
  let fixture: ComponentFixture<PickupTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickupTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
