import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMarca, getMarcaIdentifier } from '../marca.model';

export type EntityResponseType = HttpResponse<IMarca>;
export type EntityArrayResponseType = HttpResponse<IMarca[]>;

@Injectable({ providedIn: 'root' })
export class MarcaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/marcas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(marca: IMarca): Observable<EntityResponseType> {
    return this.http.post<IMarca>(this.resourceUrl, marca, { observe: 'response' });
  }

  update(marca: IMarca): Observable<EntityResponseType> {
    return this.http.put<IMarca>(`${this.resourceUrl}/${getMarcaIdentifier(marca) as number}`, marca, { observe: 'response' });
  }

  partialUpdate(marca: IMarca): Observable<EntityResponseType> {
    return this.http.patch<IMarca>(`${this.resourceUrl}/${getMarcaIdentifier(marca) as number}`, marca, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMarca>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMarca[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMarcaToCollectionIfMissing(marcaCollection: IMarca[], ...marcasToCheck: (IMarca | null | undefined)[]): IMarca[] {
    const marcas: IMarca[] = marcasToCheck.filter(isPresent);
    if (marcas.length > 0) {
      const marcaCollectionIdentifiers = marcaCollection.map(marcaItem => getMarcaIdentifier(marcaItem)!);
      const marcasToAdd = marcas.filter(marcaItem => {
        const marcaIdentifier = getMarcaIdentifier(marcaItem);
        if (marcaIdentifier == null || marcaCollectionIdentifiers.includes(marcaIdentifier)) {
          return false;
        }
        marcaCollectionIdentifiers.push(marcaIdentifier);
        return true;
      });
      return [...marcasToAdd, ...marcaCollection];
    }
    return marcaCollection;
  }
}
