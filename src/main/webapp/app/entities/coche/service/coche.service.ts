import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICoche, getCocheIdentifier } from '../coche.model';

export type EntityResponseType = HttpResponse<ICoche>;
export type EntityArrayResponseType = HttpResponse<ICoche[]>;

@Injectable({ providedIn: 'root' })
export class CocheService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/coches');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(coche: ICoche): Observable<EntityResponseType> {
    return this.http.post<ICoche>(this.resourceUrl, coche, { observe: 'response' });
  }

  update(coche: ICoche): Observable<EntityResponseType> {
    return this.http.put<ICoche>(`${this.resourceUrl}/${getCocheIdentifier(coche) as number}`, coche, { observe: 'response' });
  }

  partialUpdate(coche: ICoche): Observable<EntityResponseType> {
    return this.http.patch<ICoche>(`${this.resourceUrl}/${getCocheIdentifier(coche) as number}`, coche, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoche>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoche[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCocheToCollectionIfMissing(cocheCollection: ICoche[], ...cochesToCheck: (ICoche | null | undefined)[]): ICoche[] {
    const coches: ICoche[] = cochesToCheck.filter(isPresent);
    if (coches.length > 0) {
      const cocheCollectionIdentifiers = cocheCollection.map(cocheItem => getCocheIdentifier(cocheItem)!);
      const cochesToAdd = coches.filter(cocheItem => {
        const cocheIdentifier = getCocheIdentifier(cocheItem);
        if (cocheIdentifier == null || cocheCollectionIdentifiers.includes(cocheIdentifier)) {
          return false;
        }
        cocheCollectionIdentifiers.push(cocheIdentifier);
        return true;
      });
      return [...cochesToAdd, ...cocheCollection];
    }
    return cocheCollection;
  }
}
