import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServiceUtil } from 'app/shared/model/utilisateur/service-util.model';
import { ServiceUtilService } from './service-util.service';

@Component({
  templateUrl: './service-util-delete-dialog.component.html',
})
export class ServiceUtilDeleteDialogComponent {
  serviceUtil?: IServiceUtil;

  constructor(
    protected serviceUtilService: ServiceUtilService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.serviceUtilService.delete(id).subscribe(() => {
      this.eventManager.broadcast('serviceUtilListModification');
      this.activeModal.close();
    });
  }
}
