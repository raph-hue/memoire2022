import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';

@Component({
  selector: 'jhi-profile-util-detail',
  templateUrl: './profile-util-detail.component.html',
})
export class ProfileUtilDetailComponent implements OnInit {
  profileUtil: IProfileUtil | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profileUtil }) => (this.profileUtil = profileUtil));
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
