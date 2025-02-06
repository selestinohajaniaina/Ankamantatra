import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, RouterModule, HttpClientModule],
})
export class LoginPage implements OnInit {

  public username!: string;

  constructor(private service: ServiceService, private router: Router, private loading: LoadingController, private alert: AlertController) { }

  async ngOnInit() {
  }

  async login() {
    
    const loading = this.loading.create({
      message: 'Fanamarinana ...',
    });
    (await loading).present();

    if(this.username) {
      this.service.createUser(this.username)
      .pipe(
        catchError((error: any) => {
          return of(error);
        })
      )
      .subscribe(async (result: any) => {
        if(result && result.status) {
          (await loading).dismiss();
          localStorage.setItem('authorization', result.token);
          // this.router.navigate(['/']);
          // reload the page
        } else {
          (await loading).dismiss();
          this.showAlert('Misy olana amin\'ny fifandraisana...')
        }
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

  async showAlert(text: string) {
    const alert = await this.alert.create({
      message: text,
      buttons: [
        {role: 'quitter', text: 'Quitter'},
        {role: 'actualiser', text: 'Actualiser'},
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    // console.log(data.values[0]);
  }


}
