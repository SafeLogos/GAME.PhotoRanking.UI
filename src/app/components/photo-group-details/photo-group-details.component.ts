import { Component, OnInit } from '@angular/core';
import { PhotoGroupsService } from '../../services/photo-groups.service';
import { RequestsService } from '../../services/requests.service';
import { PhotoGroupModel } from '../../models/photo-group-model';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from '../../services/files.service';

@Component({
  selector: 'app-photo-group-details',
  templateUrl: './photo-group-details.component.html',
  styleUrl: './photo-group-details.component.scss'
})
export class PhotoGroupDetailsComponent implements OnInit {
  constructor(private photoGroupsService: PhotoGroupsService, 
    private rs: RequestsService,
    private filesService: FilesService,
    private route: ActivatedRoute){

  }


  group: PhotoGroupModel | undefined;
  images: string[] = []

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.rs.handle(this.photoGroupsService.get(id), data => this.loadGroup(data.data))
  }

  loadGroup(group: PhotoGroupModel){
    this.group = group;
    group.photos.forEach(photo => {
      this.rs.handle(this.filesService.base64(photo.imageId), data => {
        this.images.push("data:image/png;base64, " + data.data)
      })
    })
  }

}
