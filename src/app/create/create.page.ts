import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton, IonCardSubtitle } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton, IonCardSubtitle]
})
export class CreatePage implements OnInit {
  public textContent!: string | null;
  public category: number = 1;
  public categoryList!: {
    id: number,
    region: string,
    updatedAt: string,
    createdAt: string
  }[];

  constructor(private nav: NavController, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.initCategory();
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

  initCategory() {
    this.service.findAllCategory()
    .subscribe((result: any) => {
      this.categoryList = result.data      
    })
  }

  createAnkamantatra() {
    if(this.textContent) {
      this.service.createAnkamantatra(this.textContent, this.category)
        .subscribe((result: any) => {
          this.textContent = '';
          this.textContentChange();
          this.service.showToast(result.message)
          this.router.navigate(['/']);
        })
    }
  }

}
