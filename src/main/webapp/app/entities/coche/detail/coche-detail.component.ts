import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICoche } from '../coche.model';

@Component({
  selector: 'jhi-coche-detail',
  templateUrl: './coche-detail.component.html',
})
export class CocheDetailComponent implements OnInit {
  coche: ICoche | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coche }) => {
      this.coche = coche;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
