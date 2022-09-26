import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHoraire, Horaire } from 'app/shared/model/cours/horaire.model';
import { HoraireService } from './horaire.service';

@Component({
  selector: 'jhi-horaire-update',
  templateUrl: './horaire-update.component.html',
})
export class HoraireUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    horaire: [null, [Validators.required]],
  });

  constructor(protected horaireService: HoraireService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horaire }) => {
      if (!horaire.id) {
        const today = moment().startOf('day');
        horaire.horaire = today;
      }

      this.updateForm(horaire);
    });
  }

  updateForm(horaire: IHoraire): void {
    this.editForm.patchValue({
      id: horaire.id,
      horaire: horaire.horaire ? horaire.horaire.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horaire = this.createFromForm();
    if (horaire.id !== undefined) {
      this.subscribeToSaveResponse(this.horaireService.update(horaire));
    } else {
      this.subscribeToSaveResponse(this.horaireService.create(horaire));
    }
  }

  private createFromForm(): IHoraire {
    return {
      ...new Horaire(),
      id: this.editForm.get(['id'])!.value,
      horaire: this.editForm.get(['horaire'])!.value ? moment(this.editForm.get(['horaire'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHoraire>>): void {
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
}
