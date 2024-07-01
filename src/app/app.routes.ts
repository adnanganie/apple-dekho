import { Routes } from '@angular/router'
import { AuthGuard } from './services/auth-guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up/sign-up.page').then((m) => m.SignUpPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./about-us/about-us.page').then((m) => m.AboutUsPage),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./privacy-policy/privacy-policy.page').then(
        (m) => m.PrivacyPolicyPage
      ),
  },
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('./terms-conditions/terms-conditions.page').then(
        (m) => m.TermsConditionsPage
      ),
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./support/support.page').then((m) => m.SupportPage),
  },
  {
    path: 'add-box',
    loadComponent: () =>
      import('./add-box/add-box.page').then((m) => m.AddBoxPage),
  },
  {
    path: 'box-list',
    loadComponent: () =>
      import('./box-list/box-list.page').then((m) => m.BoxListPage),
  },
]
