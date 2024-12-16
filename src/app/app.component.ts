import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, earthSharp, earthOutline, addCircleOutline, addCircleSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Ankamantatra', url: '/folder/Ankamantatra', icon: 'earth' },
    { title: 'Hanontany', url: '/folder/hanontany', icon: 'add-circle' },
    { title: 'Nankafizina', url: '/folder/nankafizina', icon: 'heart' },
    { title: 'Tahiry', url: '/folder/tahiry', icon: 'archive' },
    { title: 'Nofafaina', url: '/folder/nofafaina', icon: 'trash' },
    { title: 'Hilaza olana', url: '/folder/olana', icon: 'warning' },
  ];
  public labels = ['Namana', 'Naoty', 'Statistika'];
  constructor() {
    addIcons({ earthOutline, earthSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, addCircleOutline, addCircleSharp });
  }
}
