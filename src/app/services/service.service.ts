import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string = environment.url;
  private token: any;

  constructor(private http: HttpClient, private toast: ToastController) {
    this.token = localStorage.getItem('authorization');
  }

  async showToast(_message: string) {
    const _toast = await this.toast.create({
      message: _message,
      duration: 2000
    });
    _toast.present();
  }

  createUser(name: string) {
    return this.http.post(`${this.url}/users`, {name: name});
  }

  findAllUsers() {
    return this.http.get(`${this.url}/users`, {headers: { authorization: this.token }});
  }

  sendFeedBack(message: string) {
    return this.http.post(`${this.url}/messages`,
      {message: message},
      {headers: {authorization: this.token}}
    );
  }

  createAnkamantatra(text: string, categoryId: number) {
    return this.http.post(`${this.url}/ankamantatras`, 
      {content: text, category: categoryId},
      { headers: {authorization: this.token}}
    );
  }
  
  findAllCategory() {
    return this.http.get(`${this.url}/category`, 
      { headers: {authorization: this.token}}
    );
  }

}
