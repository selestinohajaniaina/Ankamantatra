import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubbles, heart, bookmark, arrowUpCircleOutline, arrowDownCircleOutline } from 'ionicons/icons';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation } from 'swiper';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { Ankamantatra } from '../interfaces/Ankamantatra';
import { AppComponent } from '../app.component';

SwiperCore.use([Navigation]);

addIcons({ heart, chatbubbles, bookmark, arrowUpCircleOutline, arrowDownCircleOutline })

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonIcon, SwiperModule, CommonModule, IonSpinner],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public data!: Ankamantatra[];
  public myId!: number;

  constructor(
    private alert: AlertController,
    private service: ServiceService,
    private app: AppComponent
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.token = localStorage.getItem('authorization');
    this.app.showMenu = true;
    // this.data = [
    //   {question: "Tsy omby, tsy ondry nefa mahalala ny maintso hohanina."},
    //   {question: "Izy mivady no miady ka ny ankizy no voapotsipotsika."},
    //   {question: "Anaty rano tsy lena, an-tanety tsy malazo."},
    //   {question: "Elobe tsy mipiaka."},
    //   {question: "Alina izy tonga tsy nantsoina, atoandro very tsy nangalarina."},
    //   {question: "Akana vao mitombo."},
    //   {question: "Tsy basy mipoaka, tsy tafondro mirefotra nefa feno ra Madagasikara."},
    //   {question: "Teraka mba lava ihany, antitra vao mitsipozy."},
    // ];
    this.findRandom();
  }

  async answer(ankamantatra: Ankamantatra, event: any) {
    const alert = await this.alert.create({
      message: 'Inona ny valiny ?',
      inputs: [{id: 'answer'}],
      buttons: [
        {role: 'annuler', text: 'Averina'},
        {role: 'valider', text: 'Hamarinina'},
      ],
    });
    await alert.present();

    const { role, data } = await alert.onDidDismiss();
    // console.log(data.values[0]);
    if(role == 'valider') {
      if(data.values[0]) this.verifyAnswer(ankamantatra, data.values[0], event);
      else this.service.showToast('Tsy misy valiny nampidirina');
    }
  }

  findRandom() {
    this.service.findAnkamantatras()
      .subscribe((result: any) => {
        if(result.status) {
          this.myId = result.uid;
          this.data = result.data;
          // console.log(this.data);
        }
      })
    }
    
  onSlideChange(event: any) {
    const swiper = event.swiper; // Récupère l'instance Swiper
    // this.data = this.data.concat(result.data);
    console.log('Slide changed! Active index:', event[0]);
  }

  like(ankamantatraId: number, event: any) {
    this.service.like(ankamantatraId)
      .subscribe((result: any) => {
        event.target.nextElementSibling.textContent = result.data.countReaction == 0 ? '' : result.data.countReaction;
      })
  }

  verifyAnswer(ankamantatra: Ankamantatra, answer: string, event: any) {
      if(answer.toLowerCase() == ankamantatra.response ) this.service.showToast('Marina ny valiny');
      else this.service.showToast('Diso ny valinteninao');
      this.service.saveAnswer(ankamantatra.id, answer)
        .subscribe((result: any) => {
          if(result.status) {
            // console.log(result.message);
            event.target.nextElementSibling.textContent = result.data == 0 ? '' : result.data;
          }
        })
  }

  save(ankamantatraId: number, event: any) {
    this.service.saveAnkamantatras(ankamantatraId)
      .subscribe((result: any) => {
        if(result.status == true) {
          this.service.showToast(result.message);
          event.target.nextElementSibling.textContent = result.data == 0 ? '' : result.data;
        }
      })
  }

}
