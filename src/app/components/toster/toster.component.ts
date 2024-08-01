import { Component } from '@angular/core';
import { TosterService } from '../../services/toster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrl: './toster.component.scss'
})
export class TosterComponent {

  subscription: Subscription;

  constructor(private tosterService: TosterService){
    this.subscription = this.tosterService.getMessage().subscribe(msg => this.addMessage(msg))
  }

  messages: any[] = []

  reversedMessages: any[] = []

  addMessage(msg: any){

    let newToster = {
      type: msg.type,
      text: msg.text,
      opacity: 0
    }

    this.messages.push(newToster)
    this.reversedMessages = this.messages.slice().reverse()

    let startInterval = setInterval(() => {
      newToster.opacity += 0.02;
      if(newToster.opacity >= 1){
        clearInterval(startInterval)
        this.timeout(newToster);
      }

    }, 5)

  }

  private timeout(msg: any){
    let time = setTimeout(() => {
      let endInterval = setInterval(() => {
        msg.opacity -= 0.02;
        if(msg.opacity <= 0){
          this.messages.splice(this.messages.indexOf(msg), 1)
          this.reversedMessages = this.messages.slice().reverse()
          clearInterval(endInterval)
        }
      }, 5)
    }, 7000);
  }
}
