import { Component, OnInit } from '@angular/core';
import { TosterService } from '../../services/toster.service';
import { RankingGamesService } from '../../services/ranking-games.service';
import { PhotoGroupsService } from '../../services/photo-groups.service';
import { FilesService } from '../../services/files.service';
import { RankingGameModel } from '../../models/ranking-game-model';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../services/requests.service';
import { PhotoModel } from '../../models/photo-model';
import { RankingResult } from '../../models/ranking-result';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{

  constructor(private toster: TosterService,
    private rankingGamesService: RankingGamesService,
    private photoGroupsService: PhotoGroupsService,
    private filesService: FilesService,
    private rs: RequestsService,
    private route: ActivatedRoute
  ){

  }

  game: RankingGameModel | undefined;
  photos: { photoId: string, base64: string }[] = [];
  fullyLoaded: boolean = false;

  currentResult: RankingResult | undefined;
  leftPhoto: { photo: PhotoModel, base64: string } | undefined;
  rightPhoto: { photo: PhotoModel, base64: string } | undefined;
  winner: { photo: PhotoModel, base64: string } | undefined;


  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!
    this.rs.handle(this.rankingGamesService.get(id), data => this.loadGame(data.data))
  }

  loadGame(gameToLoad: RankingGameModel){
    this.game = gameToLoad;

    let count = 0;
    this.photos = Array(this.game!.group.photos.length);
    gameToLoad.group.photos.forEach(photo => {
      const index = this.game!.group.photos.indexOf(photo)
      this.rs.handle(this.filesService.base64(photo.imageId), data => {
        count++;
        this.photos[index] =  { photoId: photo.id, base64: "data:image/png;base64, " + data.data};
        if(count == this.photos.length){
          this.fullyLoaded = true;
          this.setPhotos();
        }
      })
    })
  }

  setPhotos(){
    if(this.game!.winner){
      this.winner = { photo: this.game!.winner, base64: this.photos.filter(p => p.photoId == this.game!.winner?.id)[0].base64 }
      return;
    }

    let layer = this.game!.layers.slice().reverse()[0];
    let res = layer.results.filter(r => !r.winner)[0]
    this.currentResult = res;
    this.leftPhoto = { photo: res.challengerA, base64: this.photos.filter(p => p.photoId == res.challengerA.id)[0].base64 }
    this.rightPhoto = { photo: res.challengerB, base64: this.photos.filter(p => p.photoId == res.challengerB.id)[0].base64 }

  }

  selectPhoto(photo: PhotoModel){
    this.rs.handle(this.rankingGamesService.selectPhoto(this.game!.id, photo.id), data => {
      this.game = data.data;
      this.setPhotos();
    })
  }
}
