import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICours, Cours } from 'app/shared/model/cours/cours.model';
import { CoursService } from './cours.service';
import { IEnseignant } from 'app/shared/model/cours/enseignant.model';
import { EnseignantService } from 'app/entities/cours/enseignant/enseignant.service';
import { IHoraire } from 'app/shared/model/cours/horaire.model';
import { HoraireService } from 'app/entities/cours/horaire/horaire.service';

type SelectableEntity = IEnseignant | IHoraire;

@Component({
  selector: 'jhi-cours-update',
  templateUrl: './cours-update.component.html',
})
export class CoursUpdateComponent implements OnInit {
  isSaving = false;
  enseignants: IEnseignant[] = [];
  horaires: IHoraire[] = [];

  editForm = this.fb.group({
    id: [],
    idMatiere: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    idClasse: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    idAnnee: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    enseignantId: [],
    horaireId: [],
  });

  constructor(
    protected coursService: CoursService,
    protected enseignantService: EnseignantService,
    protected horaireService: HoraireService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cours }) => {
      this.updateForm(cours);

      this.enseignantService.query().subscribe((res: HttpResponse<IEnseignant[]>) => (this.enseignants = res.body || []));

      this.horaireService.query().subscribe((res: HttpResponse<IHoraire[]>) => (this.horaires = res.body || []));
    });
  }

  updateForm(cours: ICours): void {
    this.editForm.patchValue({
      id: cours.id,
      idMatiere: cours.idMatiere,
      idClasse: cours.idClasse,
      idAnnee: cours.idAnnee,
      enseignantId: cours.enseignantId,
      horaireId: cours.horaireId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cours = this.createFromForm();
    if (cours.id !== undefined) {
      this.subscribeToSaveResponse(this.coursService.update(cours));
    } else {
      this.subscribeToSaveResponse(this.coursService.create(cours));
    }
  }

  private createFromForm(): ICours {
    return {
      ...new Cours(),
      id: this.editForm.get(['id'])!.value,
      idMatiere: this.editForm.get(['idMatiere'])!.value,
      idClasse: this.editForm.get(['idClasse'])!.value,
      idAnnee: this.editForm.get(['idAnnee'])!.value,
      enseignantId: this.editForm.get(['enseignantId'])!.value,
      horaireId: this.editForm.get(['horaireId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICours>>): void {
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
