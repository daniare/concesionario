import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IVenta, Venta } from '../venta.model';

import { VentaService } from './venta.service';

describe('Venta Service', () => {
  let service: VentaService;
  let httpMock: HttpTestingController;
  let elemDefault: IVenta;
  let expectedResult: IVenta | IVenta[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VentaService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      fecha: currentDate,
      tipoPago: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Venta', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.create(new Venta()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Venta', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          tipoPago: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Venta', () => {
      const patchObject = Object.assign(
        {
          fecha: currentDate.format(DATE_TIME_FORMAT),
        },
        new Venta()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Venta', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          fecha: currentDate.format(DATE_TIME_FORMAT),
          tipoPago: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          fecha: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Venta', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVentaToCollectionIfMissing', () => {
      it('should add a Venta to an empty array', () => {
        const venta: IVenta = { id: 123 };
        expectedResult = service.addVentaToCollectionIfMissing([], venta);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(venta);
      });

      it('should not add a Venta to an array that contains it', () => {
        const venta: IVenta = { id: 123 };
        const ventaCollection: IVenta[] = [
          {
            ...venta,
          },
          { id: 456 },
        ];
        expectedResult = service.addVentaToCollectionIfMissing(ventaCollection, venta);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Venta to an array that doesn't contain it", () => {
        const venta: IVenta = { id: 123 };
        const ventaCollection: IVenta[] = [{ id: 456 }];
        expectedResult = service.addVentaToCollectionIfMissing(ventaCollection, venta);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(venta);
      });

      it('should add only unique Venta to an array', () => {
        const ventaArray: IVenta[] = [{ id: 123 }, { id: 456 }, { id: 1973 }];
        const ventaCollection: IVenta[] = [{ id: 123 }];
        expectedResult = service.addVentaToCollectionIfMissing(ventaCollection, ...ventaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const venta: IVenta = { id: 123 };
        const venta2: IVenta = { id: 456 };
        expectedResult = service.addVentaToCollectionIfMissing([], venta, venta2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(venta);
        expect(expectedResult).toContain(venta2);
      });

      it('should accept null and undefined values', () => {
        const venta: IVenta = { id: 123 };
        expectedResult = service.addVentaToCollectionIfMissing([], null, venta, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(venta);
      });

      it('should return initial array if no Venta is added', () => {
        const ventaCollection: IVenta[] = [{ id: 123 }];
        expectedResult = service.addVentaToCollectionIfMissing(ventaCollection, undefined, null);
        expect(expectedResult).toEqual(ventaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
