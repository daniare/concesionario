import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ModeloDetailComponent } from './modelo-detail.component';

describe('Modelo Management Detail Component', () => {
  let comp: ModeloDetailComponent;
  let fixture: ComponentFixture<ModeloDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeloDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ modelo: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ModeloDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ModeloDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load modelo on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.modelo).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
