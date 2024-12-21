import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonSpinner, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, earthSharp, earthOutline, addCircleOutline, addCircleSharp, notificationsOutline, notificationsSharp, personCircleOutline, personCircleSharp, logOutOutline, logOutSharp, documentLockOutline, documentLockSharp } from 'ionicons/icons';
import { ServiceService } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonSpinner, IonText],
})
export class AppComponent {
  public appPages = [
    { title: 'Ankamantatra', url: '/folder/Ankamantatra', icon: 'earth' },
    { title: 'Hanontany', url: '/Hanontany', icon: 'add-circle' },
    { title: 'Notahirizina', url: '/saved', icon: 'bookmark' },
    { title: 'Natao', url: '/folder/Natao', icon: 'archive' },
    { title: 'Fampahafantarana', url: '/folder/fampahafantarana', icon: 'notifications' },
    { title: 'Hilaza olana', url: 'contact', icon: 'warning' },
  ];
  public labels = [
    {title: 'Fitsipika', url: '/rule', icon: 'document-lock'},
    {title: 'Kaonty', url: '/profil', icon: 'person-circle'},
    {title: 'Hiala', url: '', icon: 'log-out'},
  ];
  public connected: boolean = false;
  constructor(private router: Router, private service: ServiceService) {
    addIcons({ earthOutline, earthSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, addCircleOutline, addCircleSharp, notificationsOutline, notificationsSharp, personCircleOutline, personCircleSharp, logOutOutline, logOutSharp, documentLockOutline, documentLockSharp });
  }

  ngOnInit() {
    this.lookToken();
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
    this.service.findAllUsers()
    .subscribe((result: any) => {
      if (result.status) {
        this.connected = true;
        this.router.navigate(['/']);
      } else {
        this.connected = true;
        this.router.navigate(['/login']);
      }
    })
  }
}
