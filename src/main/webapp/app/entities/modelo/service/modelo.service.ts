import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IModelo, getModeloIdentifier } from '../modelo.model';

export type EntityResponseType = HttpResponse<IModelo>;
export type EntityArrayResponseType = HttpResponse<IModelo[]>;

@Injectable({ providedIn: 'root' })
export class ModeloService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/modelos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(modelo: IModelo): Observable<EntityResponseType> {
    return this.http.post<IModelo>(this.resourceUrl, modelo, { observe: 'response' });
  }

  update(modelo: IModelo): Observable<EntityResponseType> {
    return this.http.put<IModelo>(`${this.resourceUrl}/${getModeloIdentifier(modelo) as number}`, modelo, { observe: 'response' });
  }

  partialUpdate(modelo: IModelo): Observable<EntityResponseType> {
    return this.http.patch<IModelo>(`${this.resourceUrl}/${getModeloIdentifier(modelo) as number}`, modelo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModelo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModelo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addModeloToCollectionIfMissing(modeloCollection: IModelo[], ...modelosToCheck: (IModelo | null | undefined)[]): IModelo[] {
    const modelos: IModelo[] = modelosToCheck.filter(isPresent);
    if (modelos.length > 0) {
      const modeloCollectionIdentifiers = modeloCollection.map(modeloItem => getModeloIdentifier(modeloItem)!);
      const modelosToAdd = modelos.filter(modeloItem => {
        const modeloIdentifier = getModeloIdentifier(modeloItem);
        if (modeloIdentifier == null || modeloCollectionIdentifiers.includes(modeloIdentifier)) {
          return false;
        }
        modeloCollectionIdentifiers.push(modeloIdentifier);
        return true;
      });
      return [...modelosToAdd, ...modeloCollection];
    }
    return modeloCollection;
  }
}
