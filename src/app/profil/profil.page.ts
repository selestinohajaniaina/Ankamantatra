import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonInput, IonButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { User } from '../interfaces/User';
import { ServiceService } from '../services/service.service';
import { AppComponent } from '../app.component';
import { LoadingComponent } from '../component/loading/loading.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonInput, IonButton, RouterModule, LoadingComponent]
})
export class ProfilPage implements OnInit {

  public user!: User;
  public name!: string;
  public email!: string;
  public password!: string;
  public showLoading: boolean = false;

  constructor(private service: ServiceService, private router: Router, private app: AppComponent) { }

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

  update() {
    this.showLoading = true;
    if(this.name && this.email && this.password) {
      this.service.updateMyProfil(this.name, this.email, this.password)
        .subscribe((result: any) => {
          if(result && result.status) {
            this.showLoading = false;
            this.app.showToast('Tontosa ny fanovana ...');
            this.router.navigate(['/']);
          }
        })
    } else {
      this.app.showToast('Fenoy daholo ...');
      this.showLoading = false;
    }
  }

}
