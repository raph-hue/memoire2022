import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServiceUtil, ServiceUtil } from 'app/shared/model/utilisateur/service-util.model';
import { ServiceUtilService } from './service-util.service';
import { ServiceUtilComponent } from './service-util.component';
import { ServiceUtilDetailComponent } from './service-util-detail.component';
import { ServiceUtilUpdateComponent } from './service-util-update.component';

@Injectable({ providedIn: 'root' })
export class ServiceUtilResolve implements Resolve<IServiceUtil> {
  constructor(private service: ServiceUtilService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServiceUtil> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((serviceUtil: HttpResponse<ServiceUtil>) => {
          if (serviceUtil.body) {
            return of(serviceUtil.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ServiceUtil());
  }
}

export const serviceUtilRoute: Routes = [
  {
    path: '',
    component: ServiceUtilComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.utilisateurServiceUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServiceUtilDetailComponent,
    resolve: {
      serviceUtil: ServiceUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurServiceUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServiceUtilUpdateComponent,
    resolve: {
      serviceUtil: ServiceUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurServiceUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServiceUtilUpdateComponent,
    resolve: {
      serviceUtil: ServiceUtilResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.utilisateurServiceUtil.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
