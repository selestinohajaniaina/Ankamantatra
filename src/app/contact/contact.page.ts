import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent, IonTextarea, IonButton, RouterModule]
})
export class ContactPage implements OnInit {

  public feedBackMessage!: string;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  send() {
    if(this.feedBackMessage) {
      this.service.sendFeedBack(this.feedBackMessage)
        .subscribe((result: any) => {
          if(result.status) {
            this.service.showToast(result.message);
            this.router.navigate(['/']);
          } else {
            this.service.showToast('Misy olana amin\'ny fandefasana hafatra.')
          }
        });
    }
  }

}
