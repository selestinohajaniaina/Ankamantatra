import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, RouterModule, HttpClientModule],
})
export class LoginPage implements OnInit {

  public username!: string;

  constructor(private service: ServiceService, private router: Router, private loading: LoadingController) { }

  async ngOnInit() {
  }

  async login() {
    
    const loading = this.loading.create({
      message: 'Fanamarinana ...',
    });
    (await loading).present();

    if(this.username) {
      this.service.createUser(this.username)
      .subscribe(async (result: any) => {
        (await loading).dismiss();
        localStorage.setItem('authorization', result.token);
        localStorage.setItem('username', result.data.name);
        this.router.navigate(['/']);
      });
    } else {
      (await loading).dismiss();
      this.service.showToast('Fenoy ny anarana hoentinao. Oh: Ankoay29 ...');
    }
  }

  async showLoading() {
    return await this.loading.create({
      message: 'Fanamarinana ...',
    });
  }

}
