import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IModelo, Modelo } from '../modelo.model';
import { ModeloService } from '../service/modelo.service';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';

@Component({
  selector: 'jhi-modelo-update',
  templateUrl: './modelo-update.component.html',
})
export class ModeloUpdateComponent implements OnInit {
  isSaving = false;

  marcasSharedCollection: IMarca[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    marca: [],
  });

  constructor(
    protected modeloService: ModeloService,
    protected marcaService: MarcaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.updateForm(modelo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const modelo = this.createFromForm();
    if (modelo.id !== undefined) {
      this.subscribeToSaveResponse(this.modeloService.update(modelo));
    } else {
      this.subscribeToSaveResponse(this.modeloService.create(modelo));
    }
  }

  trackMarcaById(index: number, item: IMarca): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModelo>>): void {
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

  protected updateForm(modelo: IModelo): void {
    this.editForm.patchValue({
      id: modelo.id,
      nombre: modelo.nombre,
      marca: modelo.marca,
    });

    this.marcasSharedCollection = this.marcaService.addMarcaToCollectionIfMissing(this.marcasSharedCollection, modelo.marca);
  }

  protected loadRelationshipsOptions(): void {
    this.marcaService
      .query()
      .pipe(map((res: HttpResponse<IMarca[]>) => res.body ?? []))
      .pipe(map((marcas: IMarca[]) => this.marcaService.addMarcaToCollectionIfMissing(marcas, this.editForm.get('marca')!.value)))
      .subscribe((marcas: IMarca[]) => (this.marcasSharedCollection = marcas));
  }

  protected createFromForm(): IModelo {
    return {
      ...new Modelo(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      marca: this.editForm.get(['marca'])!.value,
    };
  }
}
