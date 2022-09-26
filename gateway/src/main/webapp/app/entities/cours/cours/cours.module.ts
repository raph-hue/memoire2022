import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CoursComponent } from './cours.component';
import { CoursDetailComponent } from './cours-detail.component';
import { CoursUpdateComponent } from './cours-update.component';
import { CoursDeleteDialogComponent } from './cours-delete-dialog.component';
import { coursRoute } from './cours.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(coursRoute)],
  declarations: [CoursComponent, CoursDetailComponent, CoursUpdateComponent, CoursDeleteDialogComponent],
  entryComponents: [CoursDeleteDialogComponent],
})
export class CoursCoursModule {}
