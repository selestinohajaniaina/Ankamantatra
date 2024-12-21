import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardTitle, IonCardContent, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.page.html',
  styleUrls: ['./rule.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonCardTitle, IonCardContent, IonText]
})
export class RulePage implements OnInit {

  public rules!: {title: string, content: string}[];

  constructor() { }

  ngOnInit() {
    this.rules = [
      {
        title: 'Famaritana',
        content: `Ity projet ity dia lalao ankamantatra Malagasy, izay nolovaina tamin'ny Ntaolo, ho fanabeazana ny ankizy ary hitazomana ny soatoavina tsy ho very.`
      },
      {
        title: 'Ny kaonty ato',
        content: `Afaka milalao avokoa izay rehetra mampiasa ity. Kaonty tsotra avokoa izay rehetra miditra voalohany, mitondra anarana fotsiny ary EKENA ny fanaovana anaram-bositra. Mameno adiresy mailaka sy teny miafinao ao amin'ny pejy ny kaonty ianao raha toa tsy hanokatra vaovao amin'ny fidirana manaraka.`
      },
      {
        title: 'Fiteny',
        content: `Maha Malagasy antsika ny fitenin-dRazantsika, ka mba hitazomana ny fomba amam-panao nolovaina tamin'ireo Razambe dia natao TENY GASY ity projet ity, ary miendrika soratanana avokoa ny soratra rehetra ato. Azo atao tsara ny manao fitenim-paritra rehetra.`
      },
    ]
  }

}
