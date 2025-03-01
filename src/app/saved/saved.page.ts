import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon } from '@ionic/angular/standalone';
import { ServiceService } from '../services/service.service';
import { Enregistrement } from '../interfaces/enregistrement';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent, IonBadge, IonIcon, LoadingComponent]
})
export class SavedPage implements OnInit {

  public data!: Enregistrement[];

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.findAllEnregistrement();
  }

  truncateWords(text: string): string {
    let nbr = 17;
    return text.split(" ").length > nbr ? text.split(" ").splice(0, nbr).join(" ") + "..." : text;
  }

  truncateName(text: string): string {
    let nbr = 10;
    return text.split("").length > nbr ? text.split("").splice(0, nbr).join("") + ".." : text;
  }

  findAllEnregistrement() {
    this.service.findAllSaved()
      .subscribe((result: any) => {
        if(result.status == true) {
          this.data = result.data;
        }
      })
  }

}
