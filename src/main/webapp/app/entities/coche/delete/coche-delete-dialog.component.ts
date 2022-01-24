import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICoche } from '../coche.model';
import { CocheService } from '../service/coche.service';

@Component({
  templateUrl: './coche-delete-dialog.component.html',
})
export class CocheDeleteDialogComponent {
  coche?: ICoche;

  constructor(protected cocheService: CocheService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cocheService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
