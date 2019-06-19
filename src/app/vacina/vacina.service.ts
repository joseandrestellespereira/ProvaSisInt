import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Vacina } from './models/vacina';
import { Observable } from 'rxjs-compat';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacinaService extends BaseService{

  constructor(private http: HttpClient) { 
    super();
  }

  save(vacina: Vacina): Observable<any>{
    return this.http.post(environment.urlAPI+"vacinas/", vacina)
    .catch((error: any) => Observable.throw(error));
  }

  update(vacina: Vacina): Observable<any>{
    return this.http.put(environment.urlAPI+"vacinas/"+vacina.idVacina, vacina)
    .catch((error: any) => Observable.throw(error));
  }
  
  findAll(): Observable<any>{
    return this.http.get(environment.urlAPI+"vacinas/")
    .catch((error: any) => Observable.throw(error));
  }

  remove(idVacina: number): Observable<any> {
    return this.http.delete(environment.urlAPI+"vacinas/"+idVacina)
    .catch((error: any) => Observable.throw(error));
  }

  getAnimais(): Observable<any>{
    return this.http.get(environment.urlAPI+"animals/")
    .catch((error: any) => Observable.throw(error));
  }

}
