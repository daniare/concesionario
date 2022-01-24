import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IModelo, Modelo } from '../modelo.model';
import { ModeloService } from '../service/modelo.service';

@Injectable({ providedIn: 'root' })
export class ModeloRoutingResolveService implements Resolve<IModelo> {
  constructor(protected service: ModeloService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IModelo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((modelo: HttpResponse<Modelo>) => {
          if (modelo.body) {
            return of(modelo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Modelo());
  }
}
