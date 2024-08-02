import { Component, ElementRef, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PhotoGroupsService } from '../../services/photo-groups.service';
import { RequestsService } from '../../services/requests.service';
import { PhotoGroupModel } from '../../models/photo-group-model';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../../services/files.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PhotoModel } from '../../models/photo-model';
import { TosterService } from '../../services/toster.service';
import { Router } from '@angular/router';
import { RankingGamesService } from '../../services/ranking-games.service';

@Component({
  selector: 'app-photo-group-details',
  templateUrl: './photo-group-details.component.html',
  styleUrl: './photo-group-details.component.scss'
})
export class PhotoGroupDetailsComponent implements OnInit {
  constructor(private photoGroupsService: PhotoGroupsService, 
    private rs: RequestsService,
    private toster: TosterService,
    private filesService: FilesService,
    private route: ActivatedRoute,
    private rankingService: RankingGamesService,
    private router: Router){

  }

  private modalService = inject(NgbModal);
  private openedModal: NgbModalRef|undefined;
  newPhoto: PhotoModel = this.getNewPhoto()
  newPhotoBase64: string | null = null;
  newPhotoFile: File | null = null;

  @ViewChild('image')
  newPhotoFileInput: ElementRef | undefined;

  group: PhotoGroupModel | undefined;
  images: string[] = []

  gameStarted: boolean = false;

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.rs.handle(this.photoGroupsService.get(id), data => this.loadGroup(data.data))
  }

  getNewPhoto(): PhotoModel{
    return {
      id: '',
      title: '',
      imageId: ''
    }
  }

  open(content: TemplateRef<any>) {
		this.openedModal = this.modalService.open(content);
  }

  add(content: TemplateRef<any>){
    if(!this.newPhoto.title){
      this.toster.error('Не заполнено название')
      return
    }

    if(!this.newPhotoFile){
      this.toster.error('Не выбрана картинка')
      return
    }

    

    this.rs.handle(this.photoGroupsService.addPhoto(this.newPhoto.title, this.group!.id!, this.newPhotoFile!), data => {
      if(this.newPhotoFileInput)
        this.newPhotoFileInput.nativeElement.value = '';
      this.group!.photos.push(data.data)
      this.images.push(this.newPhotoBase64!)
      this.newPhotoFile = null;
      this.newPhotoBase64 = null;
      this.newPhoto.title = '';
    }, true)

    this.openedModal?.close()
  }

  delete(photo: PhotoModel){
    this.rs.handle(this.photoGroupsService.deletePhoto(this.group!.id!, photo.id), data => {
      this.group!.photos = this.group!.photos.filter(p => p != photo)
    })
  }

  loadGroup(group: PhotoGroupModel){
    this.group = group;
    this.images = Array(group.photos.length);
    group.photos.forEach(photo => {
      const index = group.photos.indexOf(photo)
      this.rs.handle(this.filesService.base64(photo.imageId), data => {
        this.images[index] = "data:image/png;base64, " + data.data;
      })
    })
  }

  loadFile(event: any){
    let file: File = event.target.files[0]

    if(!file)
      return;

    this.newPhotoFile = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.newPhotoBase64 = reader.result as string;
    };
  }

  startGame(){

    this.gameStarted = true;
    this.rs.handle(this.rankingService.startGame(this.group!.id), data => {
      this.router.navigate(['/game', data.data])
    });

  }

}
