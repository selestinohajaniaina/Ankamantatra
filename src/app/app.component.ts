import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonSpinner, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, earthSharp, earthOutline, addCircleOutline, addCircleSharp, notificationsOutline, notificationsSharp, personCircleOutline, personCircleSharp, logOutOutline, logOutSharp, documentLockOutline, documentLockSharp, chatbubbles, chatbubblesOutline } from 'ionicons/icons';
import { ServiceService } from './services/service.service';
import { catchError, of } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ToastComponent } from './component/toast/toast.component';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonSpinner, IonText, ToastComponent],
})
export class AppComponent {
  public appPages = [
    { title: 'Ankamantatra', url: '/folder/Ankamantatra', icon: 'earth' },
    { title: 'Hanontany', url: '/Hanontany', icon: 'add-circle' },
    { title: 'Notahirizina', url: '/saved', icon: 'bookmark' },
    { title: 'Natao', url: '/created', icon: 'archive' },
    { title: 'Fampahafantarana', url: '/folder/fampahafantarana', icon: 'notifications' },
    { title: 'Hilaza olana', url: 'contact', icon: 'warning' },
  ];
  public liste = [
    {title: 'Vakiana', url: '/rule', icon: 'document-lock'},
    {title: 'Kaonty', url: '/profil', icon: 'person-circle'},
  ];
  public connected: boolean = false;
  public labels: { title: string; url: string; icon: string; }[] = this.liste;
  public nom!: string;
  public email!: string;
  public showLogout: boolean = true;
  public showMenu!: boolean;
  public isToastShow: boolean = false;
  public toastText!: string;

  constructor(private router: Router, private service: ServiceService, private alert: AlertController) {
    addIcons({ earthOutline, earthSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, addCircleOutline, addCircleSharp, notificationsOutline, notificationsSharp, personCircleOutline, personCircleSharp, logOutOutline, logOutSharp, documentLockOutline, documentLockSharp, chatbubbles, chatbubblesOutline });
  }

  ngOnInit() {
    this.lookToken();

    const platform = Capacitor.getPlatform();
    if (platform === 'web') {
      this.showLogout = false;
    }
  }

  lookToken() {
    let token = localStorage.getItem('authorization');
    if (token && token != '') {
      this.verifyToken();
    } else {
      this.connected = true;
      this.router.navigate(['/login']);
    }
  }
  
  verifyToken() {
    this.service.findMyProfil()
    .pipe(
      catchError((error: any) => {
        return of(error);
      })
    )
    .subscribe((result: any) => {
      
      if (result && result.status === true) {
        this.connected = true;
        this.showMenu = true;
        this.nom = result.data.name
        this.email = result.data.email
        this.router.navigate(['/']);
      } else if (result.status == 0) {
        this.connected = false;
        this.showAlert('Tapaka ny fifandraisana...');
      } else {
        this.showToast('Miverina miditra');
        this.connected = true;
        this.router.navigate(['/login']);
      }
    })
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
    if( role == 'quitter' ) this.close();
    else window.location.reload();
  }

  showToast(text: string) {
    this.isToastShow = true;
    this.toastText = text;
    setTimeout(() => { this.isToastShow = false }, 2000);
  }

  close() {
    App.exitApp();
  }
}
