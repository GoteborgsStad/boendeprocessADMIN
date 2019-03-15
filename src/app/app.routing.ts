import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './_guards/authentication.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StartpageComponent } from './pages/startpage/startpage.component';

const ROUTES: Routes = [
  {
    component: StartpageComponent,
    path: '',
  },
  {
    canActivate: [AuthenticationGuard],
    loadChildren: './pages/cu/cu.module#CuModule',
    path: 'cu',
  },
  {
    component: NotFoundComponent,
    path: '404',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

export const AppRoutingModule = RouterModule.forRoot(ROUTES);
