import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  CardModule, NotificationService,
  SparklineChartComponent,
  SparklineChartModule,
  ToastNotificationListModule,
  ToastNotificationModule
} from 'patternfly-ng';
import {AppRoutingModule} from './app-routing.module';
import { VerticalNavigationModule } from 'patternfly-ng';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WetrHomeComponent } from './wetr-home/wetr-home.component';
import { HttpClientModule } from '@angular/common/http';
import { WetrSearchComponent } from './wetr-search/wetr-search.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WetrFavouriteItemComponent } from './wetr-favourite-item/wetr-favourite-item.component';
import { TableModule } from 'patternfly-ng';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { WetrLoginComponent } from './wetr-login/wetr-login.component';
import { WetrStationComponent } from './wetr-station/wetr-station.component';
import { WetrStationSettingsComponent } from './wetr-station-settings/wetr-station-settings.component';
import { WetrAddMeasurementFormComponent } from './wetr-add-measurement-form/wetr-add-measurement-form.component';
import { WetrAddStationFormComponent } from './wetr-add-station-form/wetr-add-station-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatStepperModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {OAuthModule} from 'angular-oauth2-oidc';
import {WetrPersonalicationService} from './shared/wetr-personalication.service';
import { WetrSearchItemComponent } from './wetr-search-item/wetr-search-item.component';
import { WetrSearchCommunityComponent } from './wetr-search-community/wetr-search-community.component';

@NgModule({
  declarations: [
    AppComponent,
    WetrHomeComponent,
    WetrSearchComponent,
    WetrFavouriteItemComponent,
    WetrLoginComponent,
    WetrStationComponent,
    WetrStationSettingsComponent,
    WetrAddMeasurementFormComponent,
    WetrAddStationFormComponent,
    WetrSearchItemComponent,
    WetrSearchCommunityComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ToastNotificationListModule,
    BsDropdownModule.forRoot(),
    ToastNotificationModule,
    OAuthModule.forRoot(),
    ToastNotificationModule,
    VerticalNavigationModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    CardModule,
    SparklineChartModule,
    NgxDatatableModule,
    TableModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [BsDropdownConfig, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
