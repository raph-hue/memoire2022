import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ServiceUtilComponent } from './service-util.component';
import { ServiceUtilDetailComponent } from './service-util-detail.component';
import { ServiceUtilUpdateComponent } from './service-util-update.component';
import { ServiceUtilDeleteDialogComponent } from './service-util-delete-dialog.component';
import { serviceUtilRoute } from './service-util.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(serviceUtilRoute)],
  declarations: [ServiceUtilComponent, ServiceUtilDetailComponent, ServiceUtilUpdateComponent, ServiceUtilDeleteDialogComponent],
  entryComponents: [ServiceUtilDeleteDialogComponent],
})
export class UtilisateurServiceUtilModule {}
