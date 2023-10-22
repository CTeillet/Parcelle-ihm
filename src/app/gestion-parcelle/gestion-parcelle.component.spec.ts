import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionParcelleComponent } from './gestion-parcelle.component';

describe('GestionParcelleComponent', () => {
  let component: GestionParcelleComponent;
  let fixture: ComponentFixture<GestionParcelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionParcelleComponent],
    });
    fixture = TestBed.createComponent(GestionParcelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
