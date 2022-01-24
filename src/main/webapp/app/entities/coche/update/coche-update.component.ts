import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICoche, Coche } from '../coche.model';
import { CocheService } from '../service/coche.service';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';
import { IModelo } from 'app/entities/modelo/modelo.model';
import { ModeloService } from 'app/entities/modelo/service/modelo.service';

@Component({
  selector: 'jhi-coche-update',
  templateUrl: './coche-update.component.html',
})
export class CocheUpdateComponent implements OnInit {
  isSaving = false;

  marcasSharedCollection: IMarca[] = [];
  modelosSharedCollection: IModelo[] = [];

  editForm = this.fb.group({
    id: [],
    matricula: [null, [Validators.required]],
    color: [null, [Validators.required]],
    precio: [null, [Validators.required]],
    marca: [],
    modelo: [],
  });

  constructor(
    protected cocheService: CocheService,
    protected marcaService: MarcaService,
    protected modeloService: ModeloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coche }) => {
      this.updateForm(coche);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coche = this.createFromForm();
    if (coche.id !== undefined) {
      this.subscribeToSaveResponse(this.cocheService.update(coche));
    } else {
      this.subscribeToSaveResponse(this.cocheService.create(coche));
    }
  }

  trackMarcaById(index: number, item: IMarca): number {
    return item.id!;
  }

  trackModeloById(index: number, item: IModelo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoche>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(coche: ICoche): void {
    this.editForm.patchValue({
      id: coche.id,
      matricula: coche.matricula,
      color: coche.color,
      precio: coche.precio,
      marca: coche.marca,
      modelo: coche.modelo,
    });

    this.marcasSharedCollection = this.marcaService.addMarcaToCollectionIfMissing(this.marcasSharedCollection, coche.marca);
    this.modelosSharedCollection = this.modeloService.addModeloToCollectionIfMissing(this.modelosSharedCollection, coche.modelo);
  }

  protected loadRelationshipsOptions(): void {
    this.marcaService
      .query()
      .pipe(map((res: HttpResponse<IMarca[]>) => res.body ?? []))
      .pipe(map((marcas: IMarca[]) => this.marcaService.addMarcaToCollectionIfMissing(marcas, this.editForm.get('marca')!.value)))
      .subscribe((marcas: IMarca[]) => (this.marcasSharedCollection = marcas));

    this.modeloService
      .query()
      .pipe(map((res: HttpResponse<IModelo[]>) => res.body ?? []))
      .pipe(map((modelos: IModelo[]) => this.modeloService.addModeloToCollectionIfMissing(modelos, this.editForm.get('modelo')!.value)))
      .subscribe((modelos: IModelo[]) => (this.modelosSharedCollection = modelos));
  }

  protected createFromForm(): ICoche {
    return {
      ...new Coche(),
      id: this.editForm.get(['id'])!.value,
      matricula: this.editForm.get(['matricula'])!.value,
      color: this.editForm.get(['color'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
    };
  }
}
