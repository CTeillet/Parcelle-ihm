import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTerritoireComponent } from './gestion-territoire.component';

describe('GestionTerritoireComponent', () => {
  let component: GestionTerritoireComponent;
  let fixture: ComponentFixture<GestionTerritoireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTerritoireComponent],
    });
    fixture = TestBed.createComponent(GestionTerritoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
