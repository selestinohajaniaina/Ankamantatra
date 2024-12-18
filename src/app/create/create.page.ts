import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton]
})
export class CreatePage implements OnInit {
  public textContent!: string | null;

  constructor(private nav: NavController) { }

  ngOnInit() {
    let textContentLocalStorage;
    if(localStorage.getItem('textContent')) {
      textContentLocalStorage = localStorage.getItem('textContent');
      this.textContent = textContentLocalStorage;
    }
  }
  
  cancel() {
    this.nav.back();
  }
  
  textContentChange() {
    localStorage.setItem("textContent", this.textContent as string);
  }

}
