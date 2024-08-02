import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PhotoGroupModel } from '../models/photo-group-model';
import { ApiResponse } from '../models/api-response';
import { PhotoModel } from '../models/photo-model';

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

  public addPhoto(title: string, groupId: string, file: File){
    let form = new FormData();
    form.append('data', JSON.stringify({title, groupId}))
    form.append('file', file);

    console.log(file)
    return this.http.post<ApiResponse<PhotoModel>>(this.url + '/add-photo', form)
  }

  public deletePhoto(groupId: string, photoId: string){
    return this.http.delete<ApiResponse<boolean>>(this.url + "/delete-photo/" + groupId + "/" + photoId)
  }
}
