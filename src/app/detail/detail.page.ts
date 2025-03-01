import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Ankamantatra } from '../interfaces/Ankamantatra';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon, LoadingComponent]
})
export class DetailPage implements OnInit {

  private ankamantatraId!: number;
  public ankamantatra!: Ankamantatra;

  constructor(private activatedRoute: ActivatedRoute, private service: ServiceService) { }

  ngOnInit() {
    this.ankamantatraId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') as string);
    this.findAnkamantatraAt(this.ankamantatraId);
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
    return `${parts[0].value} ${parts[4].value} ${parts[2].value} ${parts[6].value}:${parts[8].value}`;
  }

  formatName(name: string): string {
    return name.slice(0,2).toUpperCase();
  }

  findAnkamantatraAt(ankamantatraId: number) {
    this.service.findAnkamantatraAt(ankamantatraId)
      .subscribe((result: any) => {
        if(result && result.status == true) {
          this.ankamantatra = result.data;
        } else {
          this.service.showToast('Misy olana ...');
        }
      })
  }

}
