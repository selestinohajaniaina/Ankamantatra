import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { Ankamantatra } from '../interfaces/Ankamantatra';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-created',
  templateUrl: './created.page.html',
  styleUrls: ['./created.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon]
})
export class CreatedPage implements OnInit {

  public data!: Ankamantatra[];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.findAllCreated();
  }

  truncateWords(text: string): string {
    let nbr = 17;
    return text.split(" ").length > nbr ? text.split(" ").splice(0, nbr).join(" ") + "..." : text;
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
    return `${parts[2].value} ${parts[4].value} ${parts[6].value}:${parts[8].value}`;
  }

  findAllCreated() {
    this.service.findAllCreated()
      .subscribe((result: any) => {
        if(result && result.status == true) {
          this.data = result.data;
        } else {
          this.service.showToast('Misy olana ...');
        }
      })
  }

}
