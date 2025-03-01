import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
})
export class ToastComponent  implements OnInit {

  @Input() text!: string; 

  constructor() { }

  ngOnInit() {}

}
