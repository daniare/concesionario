import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Observable } from 'rxjs';
import { IMarca, Marca } from '../marca.model';
import { MarcaService } from '../service/marca.service';

@Component({
  templateUrl: './marca-create.component.html',
})
export class MarcaCreateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
  });

  constructor(
    protected marcaService: MarcaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ marca }) => {
      this.updateForm(marca);
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  save(): void {
    this.isSaving = true;
    const marca = this.createFromForm();

    this.subscribeToSaveResponse(this.marcaService.create(marca));
  }

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMarca>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.activeModal.close('response');
    window.history.forward();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(marca: IMarca): void {
    this.editForm.patchValue({
      id: marca.id,
      nombre: marca.nombre,
    });
  }

  protected createFromForm(): IMarca {
    return {
      ...new Marca(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }
}
