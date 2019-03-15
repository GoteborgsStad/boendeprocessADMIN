import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeSvCaExtra from '@angular/common/locales/extra/sv';
import localeSvCa from '@angular/common/locales/sv';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MatIconRegistry } from '@angular/material';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserChangeService } from './_services/user-change.service';

registerLocaleData(localeSvCa, localeSvCaExtra);

import 'hammerjs';

import { AuthenticationGuard } from './_guards/authentication.guard';

import { AppRoutingModule } from './app.routing';

import { FooterComponent } from './shared/footer/footer.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StartpageComponent } from './pages/startpage/startpage.component';

import { LoginDialogComponent } from './pages/startpage/login-dialog/login-dialog.component';
// tslint:disable-next-line:max-line-length
import { LoginMobileBankIDFormComponent } from './pages/startpage/login-dialog/login-mobile-bankid-form/login-mobile-bankid-form.component';

import { ApiService } from './_services/api.service';
import { AssignmentCategoryService } from './_services/assignment-category.service';
import { AssignmentFormService } from './_services/assignment-form.service';
import { AssignmentStatusService } from './_services/assignment-status.service';
import { AssignmentService } from './_services/assignment.service';
import { AuthenticationService } from './_services/authentication.service';
import { ChatService } from './_services/chat.service';
import { EvaluationAnswerService } from './_services/evaluation-answer.service';
import { EvaluationStatusService } from './_services/evaluation-status.service';
import { EvaluationService } from './_services/evaluation.service';
import { FileService } from './_services/file.service';
import { GoalService } from './_services/goal.service';
import { UserService } from './_services/user.service';

import { GoalStatusService } from './_services/goal-status.service';
import { HttpInterceptorService } from './_services/http-interceptor.service';
import { NotificationService } from './_services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    StartpageComponent,
    LoginDialogComponent,
    LoginMobileBankIDFormComponent,
  ],
  entryComponents: [
    LoginDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    AuthenticationGuard,
    ApiService,
    AuthenticationService,
    ChatService,
    EvaluationService,
    EvaluationAnswerService,
    EvaluationStatusService,
    UserService,
    FileService,
    AssignmentCategoryService,
    AssignmentFormService,
    AssignmentService,
    AssignmentStatusService,
    NotificationService,
    GoalService,
    GoalStatusService,
    UserChangeService,
    {
      provide: LOCALE_ID,
      useValue: 'sv',
    },
    { provide: MAT_DATE_LOCALE, useValue: 'sv-SE'},
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
    },
  ],

  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer,
  ) {
    // icons
    /* tslint:disable */
    this._matIconRegistry
      .addSvgIcon('sb-add', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_add.svg'))
      .addSvgIcon('sb-plus', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_plus.svg'))
      .addSvgIcon('sb-book-a', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_book_a.svg'))
      .addSvgIcon('sb-book-n', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_book_n.svg'))
      .addSvgIcon('sb-calendar-a', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_calendar_a.svg'))
      .addSvgIcon('sb-calendar-n', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_calendar_n.svg'))
      .addSvgIcon('sb-check', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_check.svg'))
      .addSvgIcon('sb-check-round', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_checkRound.svg'))
      .addSvgIcon('sb-cog', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_cog.svg'))
      .addSvgIcon('sb-document', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_document.svg'))
      .addSvgIcon('sb-edit-round', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_editRound.svg'))
      .addSvgIcon('sb-pencil', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_pencil.svg'))
      .addSvgIcon('sb-flower', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_flower.svg'))
      .addSvgIcon('sb-folder', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_folder.svg'))
      .addSvgIcon('sb-id-badge', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_idBadge.svg'))
      .addSvgIcon('sb-leaf', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_leaf.svg'))
      .addSvgIcon('sb-letter-a', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_letter_a.svg'))
      .addSvgIcon('sb-letter-n', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_letter_n.svg'))
      .addSvgIcon('sb-person-default', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_person_default.svg'))
      .addSvgIcon('sb-person-silhouette', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_person_silhouette.svg'))
      .addSvgIcon('sb-status-alert', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_statusAlert.svg'))
      .addSvgIcon('sb-status-ring', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_statusRing.svg'))
      .addSvgIcon('sb-subtract', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_subtract.svg'))
      .addSvgIcon('sb-trashcan', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_trashcan.svg'))
      .addSvgIcon('sb-x', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_x.svg'))
      .addSvgIcon('sb-x-round-pink', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/icon_xRound_Pink.svg'))

      // logos
      .addSvgIcon('sb-bank-id', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/logos/logo_bankID.svg'))
      .addSvgIcon('sb-gbg', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/logos/logo_gbg.svg'))
      .addSvgIcon('sb-sambuh', this._sanitizer.bypassSecurityTrustResourceUrl('assets/images/logos/logo_sambuh.svg'));
    /* tslint:enable */
  }
}
