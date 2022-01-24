import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CocheDetailComponent } from './coche-detail.component';

describe('Coche Management Detail Component', () => {
  let comp: CocheDetailComponent;
  let fixture: ComponentFixture<CocheDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CocheDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ coche: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CocheDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CocheDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load coche on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.coche).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
