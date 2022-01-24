import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMarca } from '../marca.model';

@Component({
  selector: 'jhi-marca-detail',
  templateUrl: './marca-detail.component.html',
})
export class MarcaDetailComponent implements OnInit {
  marca: IMarca | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ marca }) => {
      this.marca = marca;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
