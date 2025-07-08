import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModoPagoComponent } from './gestion-modo-pago.component';

describe('GestionModoPagoComponent', () => {
  let component: GestionModoPagoComponent;
  let fixture: ComponentFixture<GestionModoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionModoPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionModoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
