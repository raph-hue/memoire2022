import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';

type EntityResponseType = HttpResponse<IProfileUtil>;
type EntityArrayResponseType = HttpResponse<IProfileUtil[]>;

@Injectable({ providedIn: 'root' })
export class ProfileUtilService {
  public resourceUrl = SERVER_API_URL + 'services/utilisateur/api/profile-utils';

  constructor(protected http: HttpClient) {}

  create(profileUtil: IProfileUtil): Observable<EntityResponseType> {
    return this.http.post<IProfileUtil>(this.resourceUrl, profileUtil, { observe: 'response' });
  }

  update(profileUtil: IProfileUtil): Observable<EntityResponseType> {
    return this.http.put<IProfileUtil>(this.resourceUrl, profileUtil, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProfileUtil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProfileUtil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
