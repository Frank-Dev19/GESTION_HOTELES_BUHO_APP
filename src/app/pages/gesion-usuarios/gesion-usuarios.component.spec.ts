import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesionUsuariosComponent } from './gesion-usuarios.component';

describe('GesionUsuariosComponent', () => {
  let component: GesionUsuariosComponent;
  let fixture: ComponentFixture<GesionUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GesionUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GesionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
