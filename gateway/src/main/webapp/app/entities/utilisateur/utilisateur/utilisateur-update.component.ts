import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IUtilisateur, Utilisateur } from 'app/shared/model/utilisateur/utilisateur.model';
import { UtilisateurService } from './utilisateur.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IServiceUtil } from 'app/shared/model/utilisateur/service-util.model';
import { ServiceUtilService } from 'app/entities/utilisateur/service-util/service-util.service';
import { IProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';
import { ProfileUtilService } from 'app/entities/utilisateur/profile-util/profile-util.service';

type SelectableEntity = IServiceUtil | IProfileUtil;

@Component({
  selector: 'jhi-utilisateur-update',
  templateUrl: './utilisateur-update.component.html',
})
export class UtilisateurUpdateComponent implements OnInit {
  isSaving = false;
  serviceutils: IServiceUtil[] = [];
  profileutils: IProfileUtil[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    prenom: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    sexe: [null, [Validators.required]],
    telephone: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(13)]],
    adresse: [null, [Validators.required]],
    cin: [null, [Validators.minLength(10), Validators.maxLength(14)]],
    email: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    password: [null, [Validators.required]],
    serviceUtilId: [],
    profiles: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected utilisateurService: UtilisateurService,
    protected serviceUtilService: ServiceUtilService,
    protected profileUtilService: ProfileUtilService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ utilisateur }) => {
      this.updateForm(utilisateur);

      this.serviceUtilService.query().subscribe((res: HttpResponse<IServiceUtil[]>) => (this.serviceutils = res.body || []));

      this.profileUtilService.query().subscribe((res: HttpResponse<IProfileUtil[]>) => (this.profileutils = res.body || []));
    });
  }

  updateForm(utilisateur: IUtilisateur): void {
    this.editForm.patchValue({
      id: utilisateur.id,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      sexe: utilisateur.sexe,
      telephone: utilisateur.telephone,
      adresse: utilisateur.adresse,
      cin: utilisateur.cin,
      email: utilisateur.email,
      password: utilisateur.password,
      serviceUtilId: utilisateur.serviceUtilId,
      profiles: utilisateur.profiles,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const utilisateur = this.createFromForm();
    if (utilisateur.id !== undefined) {
      this.subscribeToSaveResponse(this.utilisateurService.update(utilisateur));
    } else {
      this.subscribeToSaveResponse(this.utilisateurService.create(utilisateur));
    }
  }

  private createFromForm(): IUtilisateur {
    return {
      ...new Utilisateur(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      cin: this.editForm.get(['cin'])!.value,
      email: this.editForm.get(['email'])!.value,
      password: this.editForm.get(['password'])!.value,
      serviceUtilId: this.editForm.get(['serviceUtilId'])!.value,
      profiles: this.editForm.get(['profiles'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUtilisateur>>): void {
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

  getSelected(selectedVals: IProfileUtil[], option: IProfileUtil): IProfileUtil {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
