import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProfileUtil, ProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';
import { ProfileUtilService } from './profile-util.service';
import { ProfileUtilComponent } from './profile-util.component';
import { ProfileUtilDetailComponent } from './profile-util-detail.component';
import { ProfileUtilUpdateComponent } from './profile-util-update.component';

@Injectable({ providedIn: 'root' })
export class ProfileUtilResolve implements Resolve<IProfileUtil> {
  constructor(private service: ProfileUtilService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfileUtil> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((profileUtil: HttpResponse<ProfileUtil>) => {
          if (profileUtil.body) {
            return of(profileUtil.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProfileUtil());
  }
}

export const profileUtilRoute: Routes = [
  {
    path: '',
    component: ProfileUtilComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.utilisateurProfileUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProfileUtilDetailComponent,
    resolve: {
      profileUtil: ProfileUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurProfileUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProfileUtilUpdateComponent,
    resolve: {
      profileUtil: ProfileUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurProfileUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProfileUtilUpdateComponent,
    resolve: {
      profileUtil: ProfileUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurProfileUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
