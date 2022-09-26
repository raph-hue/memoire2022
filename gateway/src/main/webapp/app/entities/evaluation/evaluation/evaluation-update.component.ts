import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEvaluation, Evaluation } from 'app/shared/model/evaluation/evaluation.model';
import { EvaluationService } from './evaluation.service';
import { ITrimestre } from 'app/shared/model/evaluation/trimestre.model';
import { TrimestreService } from 'app/entities/evaluation/trimestre/trimestre.service';

@Component({
  selector: 'jhi-evaluation-update',
  templateUrl: './evaluation-update.component.html',
})
export class EvaluationUpdateComponent implements OnInit {
  isSaving = false;
  trimestres: ITrimestre[] = [];

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    dateEvaluation: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    matiere: [null, [Validators.required]],
    trimestreId: [],
  });

  constructor(
    protected evaluationService: EvaluationService,
    protected trimestreService: TrimestreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ evaluation }) => {
      if (!evaluation.id) {
        const today = moment().startOf('day');
        evaluation.dateEvaluation = today;
      }

      this.updateForm(evaluation);

      this.trimestreService.query().subscribe((res: HttpResponse<ITrimestre[]>) => (this.trimestres = res.body || []));
    });
  }

  updateForm(evaluation: IEvaluation): void {
    this.editForm.patchValue({
      id: evaluation.id,
      type: evaluation.type,
      dateEvaluation: evaluation.dateEvaluation ? evaluation.dateEvaluation.format(DATE_TIME_FORMAT) : null,
      classe: evaluation.classe,
      matiere: evaluation.matiere,
      trimestreId: evaluation.trimestreId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const evaluation = this.createFromForm();
    if (evaluation.id !== undefined) {
      this.subscribeToSaveResponse(this.evaluationService.update(evaluation));
    } else {
      this.subscribeToSaveResponse(this.evaluationService.create(evaluation));
    }
  }

  private createFromForm(): IEvaluation {
    return {
      ...new Evaluation(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      dateEvaluation: this.editForm.get(['dateEvaluation'])!.value
        ? moment(this.editForm.get(['dateEvaluation'])!.value, DATE_TIME_FORMAT)
        : undefined,
      classe: this.editForm.get(['classe'])!.value,
      matiere: this.editForm.get(['matiere'])!.value,
      trimestreId: this.editForm.get(['trimestreId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEvaluation>>): void {
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

  trackById(index: number, item: ITrimestre): any {
    return item.id;
  }
}
