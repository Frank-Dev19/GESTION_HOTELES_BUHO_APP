import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCalificacionesComponent } from './gestion-calificaciones.component';

describe('GestionCalificacionesComponent', () => {
  let component: GestionCalificacionesComponent;
  let fixture: ComponentFixture<GestionCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionCalificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
