import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton, IonCardSubtitle, IonInput } from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonTextarea, IonCard, IonCardContent, IonButton, IonSelect, IonSelectOption, IonBackButton, IonCardSubtitle, IonInput, LoadingComponent]
})
export class CreatePage implements OnInit {
  public textContent!: string | null;
  public category: number = 1;
  public response!: string;
  public categoryList!: {
    id: number,
    region: string,
    updatedAt: string,
    createdAt: string
  }[];
  public showLoading: boolean = false;

  constructor(private nav: NavController, private service: ServiceService, private router: Router, private app: AppComponent) { }

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
    this.showLoading = true;
    if(this.textContent && this.response) {
      this.service.createAnkamantatra(this.textContent, this.response.toLowerCase(), this.category)
        .subscribe((result: any) => {
          if(result && result.status) {
            this.showLoading = false;
            this.textContent = '';
            this.response = '';
            this.textContentChange();
            this.app.showToast(result.message)
            this.router.navigate(['/']);
          }
        })
    } else {
      this.showLoading = false;
      this.app.showToast('Soraty ny ankamantatrao sy ny valiny...')
    }
  }

}
