import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IServiceUtil } from 'app/shared/model/utilisateur/service-util.model';

@Component({
  selector: 'jhi-service-util-detail',
  templateUrl: './service-util-detail.component.html',
})
export class ServiceUtilDetailComponent implements OnInit {
  serviceUtil: IServiceUtil | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ serviceUtil }) => (this.serviceUtil = serviceUtil));
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
