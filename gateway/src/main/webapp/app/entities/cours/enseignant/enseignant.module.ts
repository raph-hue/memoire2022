import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { EnseignantComponent } from './enseignant.component';
import { EnseignantDetailComponent } from './enseignant-detail.component';
import { EnseignantUpdateComponent } from './enseignant-update.component';
import { EnseignantDeleteDialogComponent } from './enseignant-delete-dialog.component';
import { enseignantRoute } from './enseignant.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(enseignantRoute)],
  declarations: [EnseignantComponent, EnseignantDetailComponent, EnseignantUpdateComponent, EnseignantDeleteDialogComponent],
  entryComponents: [EnseignantDeleteDialogComponent],
})
export class CoursEnseignantModule {}
