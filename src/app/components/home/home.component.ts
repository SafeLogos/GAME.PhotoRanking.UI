import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { PhotoGroupModel } from '../../models/photo-group-model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PhotoGroupsService } from '../../services/photo-groups.service';
import { TosterService } from '../../services/toster.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  colors: string[] = [
    "#CC66FF",
    "#FF3333",
    "#6600CC",
    "#669933",
    "#CC0066",
    "#CC0099",
    "#FF3366",
    "#FF6600",
    "#CCCCFF"
  ]

  newGroup: PhotoGroupModel = this.getNewGroup();

  private modalService = inject(NgbModal);
  private openedModal: NgbModalRef|undefined;
	
  constructor(private photoGroupsService: PhotoGroupsService, private rs: RequestsService){}

  ngOnInit(): void {
    this.rs.handle(this.photoGroupsService.getAll(), data => this.photoGroups = data.data)
  }

  

  photoGroups: PhotoGroupModel[] = []

  add(content: TemplateRef<any>){
    this.openedModal?.close();

    this.rs.handle(this.photoGroupsService.add(this.newGroup), (data) => { 
      this.photoGroups.push(data.data)
      this.newGroup = this.getNewGroup();
    }, true)
  }

  deleteGroup(group: PhotoGroupModel){
    this.photoGroupsService.delete(group.id!).subscribe(data => {
      if(data.code == 0)
        this.photoGroups.splice(this.photoGroups.indexOf(group), 1)
    })
  }

  open(content: TemplateRef<any>) {
		this.openedModal = this.modalService.open(content);
  }

  getNewGroup(): PhotoGroupModel{
    return {
      id: null,
      title: "",
      color: this.randomColor(),
      photos: []
    }
  }

  randomColor(){
    let index = Math.floor(Math.random() * this.colors.length)
    return this.colors[index]
  }
}
