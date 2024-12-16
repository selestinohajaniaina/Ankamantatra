import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubbles, heart, bookmark, arrowUpCircleOutline, arrowDownCircleOutline } from 'ionicons/icons';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { CommonModule } from '@angular/common';

SwiperCore.use([Navigation]);

addIcons({ heart, chatbubbles, bookmark, arrowUpCircleOutline, arrowDownCircleOutline })

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, SwiperModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public data: {question: string}[] = [];

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.data = [
      {question: "Tsy omby, tsy ondry nefa mahalala ny maintso hohanina."},
      {question: "Izy mivady no miady ka ny ankizy no voapotsipotsika."},
      {question: "Anaty rano tsy lena, an-tanety tsy malazo."},
      {question: "Elobe tsy mipiaka."},
      {question: "Alina izy tonga tsy nantsoina, atoandro very tsy nangalarina."},
      {question: "Akana vao mitombo."},
      {question: "Tsy basy mipoaka, tsy tafondro mirefotra nefa feno ra Madagasikara."},
      {question: "Teraka mba lava ihany, antitra vao mitsipozy."},
    ]
  }

}
