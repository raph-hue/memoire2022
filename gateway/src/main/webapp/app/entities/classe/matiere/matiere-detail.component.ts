import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMatiere } from 'app/shared/model/classe/matiere.model';

@Component({
  selector: 'jhi-matiere-detail',
  templateUrl: './matiere-detail.component.html',
})
export class MatiereDetailComponent implements OnInit {
  matiere: IMatiere | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ matiere }) => (this.matiere = matiere));
  }

  previousState(): void {
    window.history.back();
  }
}
