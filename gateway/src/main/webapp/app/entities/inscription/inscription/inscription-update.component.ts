import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInscription, Inscription } from 'app/shared/model/inscription/inscription.model';
import { InscriptionService } from './inscription.service';
import { IEleve } from 'app/shared/model/inscription/eleve.model';
import { EleveService } from 'app/entities/inscription/eleve/eleve.service';
import { IAnnee } from 'app/shared/model/inscription/annee.model';
import { AnneeService } from 'app/entities/inscription/annee/annee.service';

type SelectableEntity = IEleve | IAnnee;

@Component({
  selector: 'jhi-inscription-update',
  templateUrl: './inscription-update.component.html',
})
export class InscriptionUpdateComponent implements OnInit {
  isSaving = false;
  eleves: IEleve[] = [];
  annees: IAnnee[] = [];

  editForm = this.fb.group({
    id: [],
    dateInscription: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    statut: [null, [Validators.required]],
    eleveId: [],
    anneeId: [],
  });

  constructor(
    protected inscriptionService: InscriptionService,
    protected eleveService: EleveService,
    protected anneeService: AnneeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscription }) => {
      if (!inscription.id) {
        const today = moment().startOf('day');
        inscription.dateInscription = today;
      }

      this.updateForm(inscription);

      this.eleveService.query().subscribe((res: HttpResponse<IEleve[]>) => (this.eleves = res.body || []));

      this.anneeService.query().subscribe((res: HttpResponse<IAnnee[]>) => (this.annees = res.body || []));
    });
  }

  updateForm(inscription: IInscription): void {
    this.editForm.patchValue({
      id: inscription.id,
      dateInscription: inscription.dateInscription ? inscription.dateInscription.format(DATE_TIME_FORMAT) : null,
      classe: inscription.classe,
      statut: inscription.statut,
      eleveId: inscription.eleveId,
      anneeId: inscription.anneeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscription = this.createFromForm();
    if (inscription.id !== undefined) {
      this.subscribeToSaveResponse(this.inscriptionService.update(inscription));
    } else {
      this.subscribeToSaveResponse(this.inscriptionService.create(inscription));
    }
  }

  private createFromForm(): IInscription {
    return {
      ...new Inscription(),
      id: this.editForm.get(['id'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value
        ? moment(this.editForm.get(['dateInscription'])!.value, DATE_TIME_FORMAT)
        : undefined,
      classe: this.editForm.get(['classe'])!.value,
      statut: this.editForm.get(['statut'])!.value,
      eleveId: this.editForm.get(['eleveId'])!.value,
      anneeId: this.editForm.get(['anneeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
