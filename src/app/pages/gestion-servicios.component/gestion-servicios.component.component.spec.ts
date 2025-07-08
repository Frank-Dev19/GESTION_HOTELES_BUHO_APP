import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionServiciosComponentComponent } from './gestion-servicios.component.component';

describe('GestionServiciosComponentComponent', () => {
  let component: GestionServiciosComponentComponent;
  let fixture: ComponentFixture<GestionServiciosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionServiciosComponentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GestionServiciosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
