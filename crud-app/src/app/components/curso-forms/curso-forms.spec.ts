import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoForms } from './curso-forms';

describe('CursoForms', () => {
  let component: CursoForms;
  let fixture: ComponentFixture<CursoForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoForms],
    }).compileComponents();

    fixture = TestBed.createComponent(CursoForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
