import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardContent]
})
export class SavedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  truncateWords(text: string): string {
    let nbr = 17;
    return text.split(" ").length > nbr ? text.split(" ").splice(0, nbr).join(" ") + "..." : text;
  }

}
