import { Component, inject, TemplateRef } from '@angular/core';
import { PhotoGroupModel } from '../../models/photo-group-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
	

  photoGroups: PhotoGroupModel[] = [
    this.getNewGroup(), this.getNewGroup()
  ]

  add(){
    this.photoGroups.push(this.getNewGroup())
  }

  test(){
    alert('asdasd')
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getNewGroup(): PhotoGroupModel{
    return {
      title: "Неизвестная группа",
      color: this.randomColor()
    }
  }

  randomColor(){
    let index = Math.floor(Math.random() * this.colors.length)
    return this.colors[index]
  }
}
