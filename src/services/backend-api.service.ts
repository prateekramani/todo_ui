import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http : HttpClient) { }

  
  getList(): any {
    return this.http.get(environment.baseApiUrl + 'todo')
  }

  postList(body : any): any {debugger
    return this.http.put(environment.baseApiUrl + 'todo',body)
  }
  
}
