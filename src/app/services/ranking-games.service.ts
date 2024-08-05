import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { RankingGameModel } from '../models/ranking-game-model';

@Injectable({
  providedIn: 'root'
})
export class RankingGamesService {

  url = environment.apiUrl + "ranking-games"
  constructor(private http: HttpClient) { }

  public get(id: string){
    return this.http.get<ApiResponse<RankingGameModel>>(this.url + "/" + id)
  }

  public startGame(groupId: string){
    return this.http.post<ApiResponse<string>>(this.url + "/start-game/" + groupId, null)
  }

  public selectPhoto(gameId: string, photoId: string){
    return this.http.post<ApiResponse<RankingGameModel>>(`${this.url}/select-photo/${gameId}/${photoId}`, null)
  }

  
}
