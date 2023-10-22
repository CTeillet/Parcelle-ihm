import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPateComponent } from './gestion-pate.component';

describe('GestionPateComponent', () => {
  let component: GestionPateComponent;
  let fixture: ComponentFixture<GestionPateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionPateComponent],
    });
    fixture = TestBed.createComponent(GestionPateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
