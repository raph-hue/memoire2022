import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServiceUtil } from 'app/shared/model/utilisateur/service-util.model';

type EntityResponseType = HttpResponse<IServiceUtil>;
type EntityArrayResponseType = HttpResponse<IServiceUtil[]>;

@Injectable({ providedIn: 'root' })
export class ServiceUtilService {
  public resourceUrl = SERVER_API_URL + 'services/utilisateur/api/service-utils';

  constructor(protected http: HttpClient) {}

  create(serviceUtil: IServiceUtil): Observable<EntityResponseType> {
    return this.http.post<IServiceUtil>(this.resourceUrl, serviceUtil, { observe: 'response' });
  }

  update(serviceUtil: IServiceUtil): Observable<EntityResponseType> {
    return this.http.put<IServiceUtil>(this.resourceUrl, serviceUtil, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServiceUtil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServiceUtil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
