import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonInput, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { User } from '../interfaces/User';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonInput, IonButton, RouterModule]
})
export class ProfilPage implements OnInit {

  public user!: User;
  public name!: string;
  public email!: string;
  public password!: string;

  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.myData();
  }

  myData() {
    this.service.findMyProfil()
      .subscribe((result: any) => {
        this.user = result.data;
        this.name = this.user.name;
        this.email = this.user.email;
      });
  }

}
