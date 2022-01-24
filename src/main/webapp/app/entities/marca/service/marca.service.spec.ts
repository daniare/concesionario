import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMarca, Marca } from '../marca.model';

import { MarcaService } from './marca.service';

describe('Marca Service', () => {
  let service: MarcaService;
  let httpMock: HttpTestingController;
  let elemDefault: IMarca;
  let expectedResult: IMarca | IMarca[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MarcaService);
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

    it('should create a Marca', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Marca()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Marca', () => {
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

    it('should partial update a Marca', () => {
      const patchObject = Object.assign({}, new Marca());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Marca', () => {
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

    it('should delete a Marca', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addMarcaToCollectionIfMissing', () => {
      it('should add a Marca to an empty array', () => {
        const marca: IMarca = { id: 123 };
        expectedResult = service.addMarcaToCollectionIfMissing([], marca);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(marca);
      });

      it('should not add a Marca to an array that contains it', () => {
        const marca: IMarca = { id: 123 };
        const marcaCollection: IMarca[] = [
          {
            ...marca,
          },
          { id: 456 },
        ];
        expectedResult = service.addMarcaToCollectionIfMissing(marcaCollection, marca);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Marca to an array that doesn't contain it", () => {
        const marca: IMarca = { id: 123 };
        const marcaCollection: IMarca[] = [{ id: 456 }];
        expectedResult = service.addMarcaToCollectionIfMissing(marcaCollection, marca);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(marca);
      });

      it('should add only unique Marca to an array', () => {
        const marcaArray: IMarca[] = [{ id: 123 }, { id: 456 }, { id: 12496 }];
        const marcaCollection: IMarca[] = [{ id: 123 }];
        expectedResult = service.addMarcaToCollectionIfMissing(marcaCollection, ...marcaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const marca: IMarca = { id: 123 };
        const marca2: IMarca = { id: 456 };
        expectedResult = service.addMarcaToCollectionIfMissing([], marca, marca2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(marca);
        expect(expectedResult).toContain(marca2);
      });

      it('should accept null and undefined values', () => {
        const marca: IMarca = { id: 123 };
        expectedResult = service.addMarcaToCollectionIfMissing([], null, marca, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(marca);
      });

      it('should return initial array if no Marca is added', () => {
        const marcaCollection: IMarca[] = [{ id: 123 }];
        expectedResult = service.addMarcaToCollectionIfMissing(marcaCollection, undefined, null);
        expect(expectedResult).toEqual(marcaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
