import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMarca, Marca } from '../marca.model';
import { MarcaService } from '../service/marca.service';

@Injectable({ providedIn: 'root' })
export class MarcaRoutingResolveService implements Resolve<IMarca> {
  constructor(protected service: MarcaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMarca> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((marca: HttpResponse<Marca>) => {
          if (marca.body) {
            return of(marca.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Marca());
  }
}
