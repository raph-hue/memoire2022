import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEnseignant } from 'app/shared/model/cours/enseignant.model';

@Component({
  selector: 'jhi-enseignant-detail',
  templateUrl: './enseignant-detail.component.html',
})
export class EnseignantDetailComponent implements OnInit {
  enseignant: IEnseignant | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ enseignant }) => (this.enseignant = enseignant));
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
