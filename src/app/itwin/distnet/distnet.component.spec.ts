import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistnetComponent } from './distnet.component';

describe('DistnetComponent', () => {
  let component: DistnetComponent;
  let fixture: ComponentFixture<DistnetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistnetComponent]
    });
    fixture = TestBed.createComponent(DistnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
