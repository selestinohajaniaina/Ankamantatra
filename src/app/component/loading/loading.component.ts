import { Component, OnInit } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [IonSpinner],
  standalone: true
})
export class LoadingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
