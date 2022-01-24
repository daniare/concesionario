import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IModelo, Modelo } from '../modelo.model';

import { ModeloService } from './modelo.service';

describe('Modelo Service', () => {
  let service: ModeloService;
  let httpMock: HttpTestingController;
  let elemDefault: IModelo;
  let expectedResult: IModelo | IModelo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ModeloService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      nombre: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Modelo', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Modelo()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Modelo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Modelo', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
        },
        new Modelo()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Modelo', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Modelo', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addModeloToCollectionIfMissing', () => {
      it('should add a Modelo to an empty array', () => {
        const modelo: IModelo = { id: 123 };
        expectedResult = service.addModeloToCollectionIfMissing([], modelo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(modelo);
      });

      it('should not add a Modelo to an array that contains it', () => {
        const modelo: IModelo = { id: 123 };
        const modeloCollection: IModelo[] = [
          {
            ...modelo,
          },
          { id: 456 },
        ];
        expectedResult = service.addModeloToCollectionIfMissing(modeloCollection, modelo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Modelo to an array that doesn't contain it", () => {
        const modelo: IModelo = { id: 123 };
        const modeloCollection: IModelo[] = [{ id: 456 }];
        expectedResult = service.addModeloToCollectionIfMissing(modeloCollection, modelo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(modelo);
      });

      it('should add only unique Modelo to an array', () => {
        const modeloArray: IModelo[] = [{ id: 123 }, { id: 456 }, { id: 81834 }];
        const modeloCollection: IModelo[] = [{ id: 123 }];
        expectedResult = service.addModeloToCollectionIfMissing(modeloCollection, ...modeloArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const modelo: IModelo = { id: 123 };
        const modelo2: IModelo = { id: 456 };
        expectedResult = service.addModeloToCollectionIfMissing([], modelo, modelo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(modelo);
        expect(expectedResult).toContain(modelo2);
      });

      it('should accept null and undefined values', () => {
        const modelo: IModelo = { id: 123 };
        expectedResult = service.addModeloToCollectionIfMissing([], null, modelo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(modelo);
      });

      it('should return initial array if no Modelo is added', () => {
        const modeloCollection: IModelo[] = [{ id: 123 }];
        expectedResult = service.addModeloToCollectionIfMissing(modeloCollection, undefined, null);
        expect(expectedResult).toEqual(modeloCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
