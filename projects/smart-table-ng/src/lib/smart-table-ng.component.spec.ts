import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableNgComponent } from './smart-table-ng.component';

describe('SmartTableNgComponent', () => {
  let component: SmartTableNgComponent;
  let fixture: ComponentFixture<SmartTableNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTableNgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartTableNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
