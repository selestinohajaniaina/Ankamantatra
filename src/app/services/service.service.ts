import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string = environment.url;
  public token: any;

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
  
  findMyProfil() {
    return this.http.get(`${this.url}/users/profil`, {headers: { authorization: this.token }});
  }

  updateMyProfil(name: string, email: string, password: string) {
    return this.http.put(`${this.url}/users/profil`,
      {name: name, email: email, password: password},
      {headers: { authorization: this.token }}
    );
  }

  findAllUsers() {
    return this.http.get(`${this.url}/users`, {headers: { authorization: this.token }});
  }

  loginPro(email: string, password: string) {
    return this.http.post(`${this.url}/users/profil`, {email: email, password: password});
  }

  sendFeedBack(message: string) {
    return this.http.post(`${this.url}/messages`,
      {message: message},
      {headers: {authorization: this.token}}
    );
  }

  createAnkamantatra(text: string, TextResponse: string, categoryId: number) {
    return this.http.post(`${this.url}/ankamantatras`, 
      {content: text, response: TextResponse, category: categoryId},
      { headers: {authorization: this.token}}
    );
  }

  findAnkamantatras() {
    return this.http.get(`${this.url}/ankamantatras`, 
      { headers: {authorization: this.token}}
    );
  }

  saveAnkamantatras(ankamantatraId: number) {
    return this.http.post(`${this.url}/enregistrements`, 
      {ankamantatra: ankamantatraId},
      { headers: {authorization: this.token}}
    );
  }

  findAllSaved() {
    return this.http.get(`${this.url}/enregistrements`, 
      { headers: {authorization: this.token}}
    );
  }
  
  findAllCategory() {
    return this.http.get(`${this.url}/category`, 
      { headers: {authorization: this.token}}
    );
  }

  like(ankamantatraId: number) {
    return this.http.post(`${this.url}/reactions`, 
      {ankamantatra: ankamantatraId},
      { headers: {authorization: this.token}}
    );
  }

  saveAnswer(ankamantatraId: number, response: string) {
    return this.http.post(`${this.url}/responses`, 
      {ankamantatra: ankamantatraId, valinteny: response},
      { headers: {authorization: this.token}}
    );
  }

}
