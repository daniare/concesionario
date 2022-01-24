import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MarcaDetailComponent } from './marca-detail.component';

describe('Marca Management Detail Component', () => {
  let comp: MarcaDetailComponent;
  let fixture: ComponentFixture<MarcaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcaDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ marca: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(MarcaDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(MarcaDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load marca on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.marca).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
