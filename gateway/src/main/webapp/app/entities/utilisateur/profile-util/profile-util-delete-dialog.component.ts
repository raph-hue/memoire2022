import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';
import { ProfileUtilService } from './profile-util.service';

@Component({
  templateUrl: './profile-util-delete-dialog.component.html',
})
export class ProfileUtilDeleteDialogComponent {
  profileUtil?: IProfileUtil;

  constructor(
    protected profileUtilService: ProfileUtilService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profileUtilService.delete(id).subscribe(() => {
      this.eventManager.broadcast('profileUtilListModification');
      this.activeModal.close();
    });
  }
}
