import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ModeloService } from '../service/modelo.service';
import { IModelo, Modelo } from '../modelo.model';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';

import { ModeloUpdateComponent } from './modelo-update.component';

describe('Modelo Management Update Component', () => {
  let comp: ModeloUpdateComponent;
  let fixture: ComponentFixture<ModeloUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let modeloService: ModeloService;
  let marcaService: MarcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ModeloUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ModeloUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ModeloUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    modeloService = TestBed.inject(ModeloService);
    marcaService = TestBed.inject(MarcaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Marca query and add missing value', () => {
      const modelo: IModelo = { id: 456 };
      const marca: IMarca = { id: 25539 };
      modelo.marca = marca;

      const marcaCollection: IMarca[] = [{ id: 42054 }];
      jest.spyOn(marcaService, 'query').mockReturnValue(of(new HttpResponse({ body: marcaCollection })));
      const additionalMarcas = [marca];
      const expectedCollection: IMarca[] = [...additionalMarcas, ...marcaCollection];
      jest.spyOn(marcaService, 'addMarcaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      expect(marcaService.query).toHaveBeenCalled();
      expect(marcaService.addMarcaToCollectionIfMissing).toHaveBeenCalledWith(marcaCollection, ...additionalMarcas);
      expect(comp.marcasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const modelo: IModelo = { id: 456 };
      const marca: IMarca = { id: 64774 };
      modelo.marca = marca;

      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(modelo));
      expect(comp.marcasSharedCollection).toContain(marca);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Modelo>>();
      const modelo = { id: 123 };
      jest.spyOn(modeloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modelo }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(modeloService.update).toHaveBeenCalledWith(modelo);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Modelo>>();
      const modelo = new Modelo();
      jest.spyOn(modeloService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: modelo }));
      saveSubject.complete();

      // THEN
      expect(modeloService.create).toHaveBeenCalledWith(modelo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Modelo>>();
      const modelo = { id: 123 };
      jest.spyOn(modeloService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ modelo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(modeloService.update).toHaveBeenCalledWith(modelo);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackMarcaById', () => {
      it('Should return tracked Marca primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackMarcaById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
