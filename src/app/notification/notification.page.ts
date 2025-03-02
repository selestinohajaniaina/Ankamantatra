import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular/standalone';
import { ServiceService } from '../services/service.service';
import { AppComponent } from '../app.component';
import { Notification } from '../interfaces/notification';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, LoadingComponent]
})
export class NotificationPage implements OnInit {

  public notifications!: Notification[];
  public message!: {
    like: string,
    answer: string,
  };
  public title!: {
    like: string,
    answer: string,
  };

  constructor(private service: ServiceService, private app: AppComponent) { }

  ngOnInit() {
    this.title = {like: 'Nankafy', answer: 'Namaly'}
    this.message = {like: 'nankafy ny ankamantatrao', answer: 'namaly ny ankamantatrao'}
    this.find();
  }

  find() {
    this.service.findNotification()
      .subscribe((result: any) => {
        if (result && result.status == true) {
          this.notifications = result.data;
        } else {
          this.app.showToast('Misy olana ...');
        }
      })
  }

  getTitle(word: string): string {
    let content;
    if(word == 'like') content = this.title.like;
    else if(word == 'answer') content = this.title.answer;
    else content = word;
    return content;
  }

  getMessage(message: string, word: string): string {
    let content;
    if(word == 'like') content = this.message.like;
    else if(word == 'answer') content = this.message.answer;
    else content = message;
    return content;
  }

  formatDate(date: Date): string {
    let newDate = new Date(date);
    let formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    let parts = formatter.formatToParts(newDate);
    return `${parts[0].value} ${parts[4].value} ${parts[2].value} ${parts[6].value}:${parts[8].value}`;
  }

  truncateWords(type: string, text: string): string {
    let nbr = 17;
    if(type != 'like' && type != 'answer' ) return '';
    return text.split(" ").length > nbr ? text.split(" ").splice(0, nbr).join(" ") + "..." : text;
  }

}
