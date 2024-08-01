import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url = environment.apiUrl + "photo-groups"
  constructor(private http: HttpClient) { }

  public base64(id: string){
    return this.http.get<ApiResponse<string>>(this.url + "/base64/" + id)
  }
}
