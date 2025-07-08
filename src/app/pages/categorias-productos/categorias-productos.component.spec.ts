import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasProductosComponent } from './categorias-productos.component';

describe('CategoriasProductosComponent', () => {
  let component: CategoriasProductosComponent;
  let fixture: ComponentFixture<CategoriasProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
