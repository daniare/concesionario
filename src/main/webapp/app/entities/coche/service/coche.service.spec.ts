import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICoche, Coche } from '../coche.model';

import { CocheService } from './coche.service';

describe('Coche Service', () => {
  let service: CocheService;
  let httpMock: HttpTestingController;
  let elemDefault: ICoche;
  let expectedResult: ICoche | ICoche[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CocheService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      matricula: 'AAAAAAA',
      color: 'AAAAAAA',
      precio: 0,
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

    it('should create a Coche', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Coche()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Coche', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          matricula: 'BBBBBB',
          color: 'BBBBBB',
          precio: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Coche', () => {
      const patchObject = Object.assign(
        {
          color: 'BBBBBB',
        },
        new Coche()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Coche', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          matricula: 'BBBBBB',
          color: 'BBBBBB',
          precio: 1,
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

    it('should delete a Coche', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCocheToCollectionIfMissing', () => {
      it('should add a Coche to an empty array', () => {
        const coche: ICoche = { id: 123 };
        expectedResult = service.addCocheToCollectionIfMissing([], coche);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(coche);
      });

      it('should not add a Coche to an array that contains it', () => {
        const coche: ICoche = { id: 123 };
        const cocheCollection: ICoche[] = [
          {
            ...coche,
          },
          { id: 456 },
        ];
        expectedResult = service.addCocheToCollectionIfMissing(cocheCollection, coche);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Coche to an array that doesn't contain it", () => {
        const coche: ICoche = { id: 123 };
        const cocheCollection: ICoche[] = [{ id: 456 }];
        expectedResult = service.addCocheToCollectionIfMissing(cocheCollection, coche);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(coche);
      });

      it('should add only unique Coche to an array', () => {
        const cocheArray: ICoche[] = [{ id: 123 }, { id: 456 }, { id: 895 }];
        const cocheCollection: ICoche[] = [{ id: 123 }];
        expectedResult = service.addCocheToCollectionIfMissing(cocheCollection, ...cocheArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const coche: ICoche = { id: 123 };
        const coche2: ICoche = { id: 456 };
        expectedResult = service.addCocheToCollectionIfMissing([], coche, coche2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(coche);
        expect(expectedResult).toContain(coche2);
      });

      it('should accept null and undefined values', () => {
        const coche: ICoche = { id: 123 };
        expectedResult = service.addCocheToCollectionIfMissing([], null, coche, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(coche);
      });

      it('should return initial array if no Coche is added', () => {
        const cocheCollection: ICoche[] = [{ id: 123 }];
        expectedResult = service.addCocheToCollectionIfMissing(cocheCollection, undefined, null);
        expect(expectedResult).toEqual(cocheCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
