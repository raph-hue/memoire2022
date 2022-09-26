import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { MatiereComponent } from './matiere.component';
import { MatiereDetailComponent } from './matiere-detail.component';
import { MatiereUpdateComponent } from './matiere-update.component';
import { MatiereDeleteDialogComponent } from './matiere-delete-dialog.component';
import { matiereRoute } from './matiere.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(matiereRoute)],
  declarations: [MatiereComponent, MatiereDetailComponent, MatiereUpdateComponent, MatiereDeleteDialogComponent],
  entryComponents: [MatiereDeleteDialogComponent],
})
export class ClasseMatiereModule {}
