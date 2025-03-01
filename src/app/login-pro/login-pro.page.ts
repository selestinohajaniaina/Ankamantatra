import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { catchError, of } from 'rxjs';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-login-pro',
  templateUrl: './login-pro.page.html',
  styleUrls: ['./login-pro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, RouterModule, IonSpinner, LoadingComponent]
})
export class LoginProPage implements OnInit {

  public email!: string;
  public password!: string;
  public showLoading: boolean = false;

  constructor( private alert: AlertController, private service: ServiceService, private router: Router, private menu: MenuController, private plateform: Platform ) {
    // this.menu.enable(false, 'my-menu');
  }

  ngOnInit() {
    this.plateform.ready().then(() => {
    this.menu.enable(true);
    });
    // console.log(this.menu.get('myMenu'));
    
  }

  ionViewDidEnter() {
    this.menu.enable(false, 'myMenu');
  }

  ionViewDidLeave() {
      this.menu.enable(true, 'myMenu');
  }

  async login() {
      this.showLoading = true;
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
            this.showLoading = false;
          } else if(result && result.token == null && result.data == null) {
            this.service.showToast(result.message);
            this.showLoading = false;
          } else {
            this.showAlert('Misy olana amin\'ny fifandraisana...')
            this.showLoading = false;
          }
        });
      } else {
        this.service.showToast('Fenoy daholo...');
        this.showLoading = false;
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
