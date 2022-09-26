import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaiement, Paiement } from 'app/shared/model/paiement/paiement.model';
import { PaiementService } from './paiement.service';
import { IMois } from 'app/shared/model/paiement/mois.model';
import { MoisService } from 'app/entities/paiement/mois/mois.service';

@Component({
  selector: 'jhi-paiement-update',
  templateUrl: './paiement-update.component.html',
})
export class PaiementUpdateComponent implements OnInit {
  isSaving = false;
  mois: IMois[] = [];
  datePaiementDp: any;

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    datePaiement: [null, [Validators.required]],
    moisId: [],
  });

  constructor(
    protected paiementService: PaiementService,
    protected moisService: MoisService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paiement }) => {
      this.updateForm(paiement);

      this.moisService.query().subscribe((res: HttpResponse<IMois[]>) => (this.mois = res.body || []));
    });
  }

  updateForm(paiement: IPaiement): void {
    this.editForm.patchValue({
      id: paiement.id,
      type: paiement.type,
      datePaiement: paiement.datePaiement,
      moisId: paiement.moisId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paiement = this.createFromForm();
    if (paiement.id !== undefined) {
      this.subscribeToSaveResponse(this.paiementService.update(paiement));
    } else {
      this.subscribeToSaveResponse(this.paiementService.create(paiement));
    }
  }

  private createFromForm(): IPaiement {
    return {
      ...new Paiement(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      datePaiement: this.editForm.get(['datePaiement'])!.value,
      moisId: this.editForm.get(['moisId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaiement>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IMois): any {
    return item.id;
  }
}
