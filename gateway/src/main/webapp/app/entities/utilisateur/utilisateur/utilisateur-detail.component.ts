import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUtilisateur } from 'app/shared/model/utilisateur/utilisateur.model';

@Component({
  selector: 'jhi-utilisateur-detail',
  templateUrl: './utilisateur-detail.component.html',
})
export class UtilisateurDetailComponent implements OnInit {
  utilisateur: IUtilisateur | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ utilisateur }) => (this.utilisateur = utilisateur));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
