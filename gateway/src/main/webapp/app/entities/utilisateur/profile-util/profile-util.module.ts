import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ProfileUtilComponent } from './profile-util.component';
import { ProfileUtilDetailComponent } from './profile-util-detail.component';
import { ProfileUtilUpdateComponent } from './profile-util-update.component';
import { ProfileUtilDeleteDialogComponent } from './profile-util-delete-dialog.component';
import { profileUtilRoute } from './profile-util.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(profileUtilRoute)],
  declarations: [ProfileUtilComponent, ProfileUtilDetailComponent, ProfileUtilUpdateComponent, ProfileUtilDeleteDialogComponent],
  entryComponents: [ProfileUtilDeleteDialogComponent],
})
export class UtilisateurProfileUtilModule {}
