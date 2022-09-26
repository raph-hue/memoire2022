import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITuteur } from 'app/shared/model/inscription/tuteur.model';

type EntityResponseType = HttpResponse<ITuteur>;
type EntityArrayResponseType = HttpResponse<ITuteur[]>;

@Injectable({ providedIn: 'root' })
export class TuteurService {
  public resourceUrl = SERVER_API_URL + 'services/inscription/api/tuteurs';

  constructor(protected http: HttpClient) {}

  create(tuteur: ITuteur): Observable<EntityResponseType> {
    return this.http.post<ITuteur>(this.resourceUrl, tuteur, { observe: 'response' });
  }

  update(tuteur: ITuteur): Observable<EntityResponseType> {
    return this.http.put<ITuteur>(this.resourceUrl, tuteur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITuteur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITuteur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
