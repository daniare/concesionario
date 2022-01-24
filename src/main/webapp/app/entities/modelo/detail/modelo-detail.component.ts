import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IModelo } from '../modelo.model';

@Component({
  selector: 'jhi-modelo-detail',
  templateUrl: './modelo-detail.component.html',
})
export class ModeloDetailComponent implements OnInit {
  modelo: IModelo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.modelo = modelo;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
