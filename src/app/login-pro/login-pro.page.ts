import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login-pro',
  templateUrl: './login-pro.page.html',
  styleUrls: ['./login-pro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, RouterModule]
})
export class LoginProPage implements OnInit {

  public email!: string;
  public password!: string;

  constructor(private loading: LoadingController, private alert: AlertController, private service: ServiceService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
      
      const loading = this.loading.create({
        message: 'Fanamarinana ...',
      });
      (await loading).present();
  
      if(this.email && this.password) {
        this.service.loginPro(this.email, this.password)
        .pipe(
          catchError((error: any) => {
            return of(error);
          })
        )
        .subscribe(async (result: any) => {
          if(result && result.status) {
            localStorage.setItem('authorization', result.token);
            this.router.navigate(['/']);
            (await loading).dismiss();
          } else if(result && result.token == null && result.data == null) {
            (await loading).dismiss();
            this.service.showToast(result.message);
          } else {
            (await loading).dismiss();
            this.showAlert('Misy olana amin\'ny fifandraisana...')
          }
        });
      } else {
        (await loading).dismiss();
        this.service.showToast('Fenoy daholo...');
      }
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
