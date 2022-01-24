import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CocheService } from '../service/coche.service';
import { ICoche, Coche } from '../coche.model';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';
import { IModelo } from 'app/entities/modelo/modelo.model';
import { ModeloService } from 'app/entities/modelo/service/modelo.service';

import { CocheUpdateComponent } from './coche-update.component';

describe('Coche Management Update Component', () => {
  let comp: CocheUpdateComponent;
  let fixture: ComponentFixture<CocheUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cocheService: CocheService;
  let marcaService: MarcaService;
  let modeloService: ModeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CocheUpdateComponent],
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
      .overrideTemplate(CocheUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CocheUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cocheService = TestBed.inject(CocheService);
    marcaService = TestBed.inject(MarcaService);
    modeloService = TestBed.inject(ModeloService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Marca query and add missing value', () => {
      const coche: ICoche = { id: 456 };
      const marca: IMarca = { id: 61097 };
      coche.marca = marca;

      const marcaCollection: IMarca[] = [{ id: 89046 }];
      jest.spyOn(marcaService, 'query').mockReturnValue(of(new HttpResponse({ body: marcaCollection })));
      const additionalMarcas = [marca];
      const expectedCollection: IMarca[] = [...additionalMarcas, ...marcaCollection];
      jest.spyOn(marcaService, 'addMarcaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      expect(marcaService.query).toHaveBeenCalled();
      expect(marcaService.addMarcaToCollectionIfMissing).toHaveBeenCalledWith(marcaCollection, ...additionalMarcas);
      expect(comp.marcasSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Modelo query and add missing value', () => {
      const coche: ICoche = { id: 456 };
      const modelo: IModelo = { id: 80471 };
      coche.modelo = modelo;

      const modeloCollection: IModelo[] = [{ id: 60319 }];
      jest.spyOn(modeloService, 'query').mockReturnValue(of(new HttpResponse({ body: modeloCollection })));
      const additionalModelos = [modelo];
      const expectedCollection: IModelo[] = [...additionalModelos, ...modeloCollection];
      jest.spyOn(modeloService, 'addModeloToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      expect(modeloService.query).toHaveBeenCalled();
      expect(modeloService.addModeloToCollectionIfMissing).toHaveBeenCalledWith(modeloCollection, ...additionalModelos);
      expect(comp.modelosSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const coche: ICoche = { id: 456 };
      const marca: IMarca = { id: 36748 };
      coche.marca = marca;
      const modelo: IModelo = { id: 7649 };
      coche.modelo = modelo;

      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(coche));
      expect(comp.marcasSharedCollection).toContain(marca);
      expect(comp.modelosSharedCollection).toContain(modelo);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Coche>>();
      const coche = { id: 123 };
      jest.spyOn(cocheService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: coche }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cocheService.update).toHaveBeenCalledWith(coche);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Coche>>();
      const coche = new Coche();
      jest.spyOn(cocheService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: coche }));
      saveSubject.complete();

      // THEN
      expect(cocheService.create).toHaveBeenCalledWith(coche);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Coche>>();
      const coche = { id: 123 };
      jest.spyOn(cocheService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ coche });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cocheService.update).toHaveBeenCalledWith(coche);
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

    describe('trackModeloById', () => {
      it('Should return tracked Modelo primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackModeloById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
