import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Ankamantatra',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'Hanontany',
    loadComponent: () => import('./create/create.page').then( m => m.CreatePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'login-pro',
    loadComponent: () => import('./login-pro/login-pro.page').then( m => m.LoginProPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: 'saved',
    loadComponent: () => import('./saved/saved.page').then( m => m.SavedPage)
  },
  {
    path: 'profil',
    loadComponent: () => import('./profil/profil.page').then( m => m.ProfilPage)
  },
  {
    path: 'rule',
    loadComponent: () => import('./rule/rule.page').then( m => m.RulePage)
  },
  {
    path: 'created',
    loadComponent: () => import('./created/created.page').then( m => m.CreatedPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/detail.page').then( m => m.DetailPage)
  },
  {
    path: 'notification',
    loadComponent: () => import('./notification/notification.page').then( m => m.NotificationPage)
  },
];
