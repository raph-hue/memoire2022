import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnnee, Annee } from 'app/shared/model/inscription/annee.model';
import { AnneeService } from './annee.service';

@Component({
  selector: 'jhi-annee-update',
  templateUrl: './annee-update.component.html',
})
export class AnneeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  });

  constructor(protected anneeService: AnneeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ annee }) => {
      this.updateForm(annee);
    });
  }

  updateForm(annee: IAnnee): void {
    this.editForm.patchValue({
      id: annee.id,
      nom: annee.nom,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const annee = this.createFromForm();
    if (annee.id !== undefined) {
      this.subscribeToSaveResponse(this.anneeService.update(annee));
    } else {
      this.subscribeToSaveResponse(this.anneeService.create(annee));
    }
  }

  private createFromForm(): IAnnee {
    return {
      ...new Annee(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnnee>>): void {
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
