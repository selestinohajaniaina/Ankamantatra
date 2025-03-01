import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { AppComponent } from '../app.component';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, RouterModule, HttpClientModule, LoadingComponent],
})
export class LoginPage implements OnInit {

  public username!: string;
  public showLoading: boolean = false;

  constructor(private service: ServiceService, private router: Router, private alert: AlertController, private menu: MenuController, private app: AppComponent) { }

  async ngOnInit() {
    this.menu.enable(false, "myMenu");
  }

  async login() {
    this.showLoading = true;
    if(this.username) {
      this.service.createUser(this.username)
      .pipe(
        catchError((error: any) => {
          return of(error);
        })
      )
      .subscribe(async (result: any) => {
        if(result && result.status) {
          this.showLoading = false;
          localStorage.setItem('authorization', result.token);
          this.service.token = result.token;
          this.app.nom = result.data.name;
          this.router.navigate(['/']);
          // reload the page
        } else {
          this.showLoading = false;
          this.app.showToast('Misy olana amin\'ny fifandraisana...')
        }
      });
    } else {
      this.showLoading = false;
      this.app.showToast('Fenoy ny anarana hoentinao. Oh: Ankoay29 ...');
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
