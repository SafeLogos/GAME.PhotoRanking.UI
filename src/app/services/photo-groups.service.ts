import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PhotoGroupModel } from '../models/photo-group-model';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class PhotoGroupsService {

  url = environment.apiUrl + "photo-groups"
  constructor(private http: HttpClient) { }

  public getAll(){
    return this.http.get<ApiResponse<PhotoGroupModel[]>>(this.url + "/all")
  }

  public get(id: string){
    return this.http.get<ApiResponse<PhotoGroupModel>>(this.url + "/" + id)
  }

  public add(group: PhotoGroupModel){
    return this.http.post<ApiResponse<PhotoGroupModel>>(this.url, group)
  }

  public delete(id: string){
    return this.http.delete<ApiResponse<boolean>>(this.url + "/" + id)
  }
}
