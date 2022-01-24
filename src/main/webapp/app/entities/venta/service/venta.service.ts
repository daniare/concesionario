import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVenta, getVentaIdentifier } from '../venta.model';

export type EntityResponseType = HttpResponse<IVenta>;
export type EntityArrayResponseType = HttpResponse<IVenta[]>;

@Injectable({ providedIn: 'root' })
export class VentaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/ventas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(venta: IVenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venta);
    return this.http
      .post<IVenta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(venta: IVenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venta);
    return this.http
      .put<IVenta>(`${this.resourceUrl}/${getVentaIdentifier(venta) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(venta: IVenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(venta);
    return this.http
      .patch<IVenta>(`${this.resourceUrl}/${getVentaIdentifier(venta) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVenta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVenta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addVentaToCollectionIfMissing(ventaCollection: IVenta[], ...ventasToCheck: (IVenta | null | undefined)[]): IVenta[] {
    const ventas: IVenta[] = ventasToCheck.filter(isPresent);
    if (ventas.length > 0) {
      const ventaCollectionIdentifiers = ventaCollection.map(ventaItem => getVentaIdentifier(ventaItem)!);
      const ventasToAdd = ventas.filter(ventaItem => {
        const ventaIdentifier = getVentaIdentifier(ventaItem);
        if (ventaIdentifier == null || ventaCollectionIdentifiers.includes(ventaIdentifier)) {
          return false;
        }
        ventaCollectionIdentifiers.push(ventaIdentifier);
        return true;
      });
      return [...ventasToAdd, ...ventaCollection];
    }
    return ventaCollection;
  }

  protected convertDateFromClient(venta: IVenta): IVenta {
    return Object.assign({}, venta, {
      fecha: venta.fecha?.isValid() ? venta.fecha.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? dayjs(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((venta: IVenta) => {
        venta.fecha = venta.fecha ? dayjs(venta.fecha) : undefined;
      });
    }
    return res;
  }
}
