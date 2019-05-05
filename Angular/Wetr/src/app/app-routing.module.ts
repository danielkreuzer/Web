import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WetrHomeComponent} from './wetr-home/wetr-home.component';
import {WetrSearchComponent} from './wetr-search/wetr-search.component';
import {WetrLoginComponent} from './wetr-login/wetr-login.component';
import {WetrStationComponent} from './wetr-station/wetr-station.component';
import {WetrStationSettingsComponent} from './wetr-station-settings/wetr-station-settings.component';
import {WetrAddMeasurementFormComponent} from './wetr-add-measurement-form/wetr-add-measurement-form.component';
import {WetrAddStationFormComponent} from './wetr-add-station-form/wetr-add-station-form.component';
import {WetrSearchCommunityComponent} from './wetr-search-community/wetr-search-community.component';

const routes: Routes = [
  {
    path: 'index.html',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: WetrHomeComponent
  },
  {
    path: 'search',
    component: WetrSearchComponent
  },
  {
    path: 'login',
    component: WetrLoginComponent
  },
  {
    path: 'settings',
    component: WetrStationSettingsComponent
  },
  {
    path: 'measurement/:id',
    component: WetrAddMeasurementFormComponent
  },
  {
    path: 'new',
    component: WetrAddStationFormComponent
  },
  {
    path: 'station/:id',
    component: WetrStationComponent
  },
  {
    path: 'search/community/:id',
    component: WetrSearchCommunityComponent
  },
  {
    path: '**',
    component: WetrHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
