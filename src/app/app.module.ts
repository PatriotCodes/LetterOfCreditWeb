import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MatToolbarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module'

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { RefreshService } from './services/refresh.service';

import { AppComponent }        from './app.component';
import { ActiveLocComponent }     from './active-loc/active-loc.component';
import { ApplyForLocComponent } from './apply-for-loc/apply-for-loc.component';
import { LocService }         from './loc.service';
import { DocsService } from './services/docs.service'
import { CreditTypeService } from './services/credit-types/credit-type.service';
import { CommonService } from './services/common/common.service';
import { IssuingBankService } from './services/issuing-bank.service';
import { AdvisingBankService } from './services/advising-bank.service';
import { RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';
import { AwaitingApprovalComponent } from './awaiting-approval/awaiting-approval.component';
import { DatepickerModule } from 'ngx-bootstrap';
import { DatePickerComponent } from './helpers/date-picker/date-picker.component';
import { ModalModule } from 'ngx-bootstrap';
import { ApplyModalComponent } from './modals/apply-modal.component';
import { DocsModalComponent } from './modals/docs-modal.component';
import { ShipModalComponent } from './modals/ship-modal.component';
import { CreatePlModalComponent } from './modals/create-pl-modal.component';
import { CreateBolModalComponent } from './modals/create-bol-modal.component';
import { CreateInvoiceModalComponent } from './modals/create-invoice-modal.component';
import { ViewInvoiceModalComponent } from './modals/view-invoice-modal.component';
import { ApproveLocModalComponent } from './modals/approve-loc-modal.component';
import { ViewLocStateModalComponent } from './modals/view-loc-state-modal.component';
import { ViewLocAppModalComponent } from './modals/view-loc-app-modal.component';
import { ViewBolModalComponent } from './modals/view-bol-modal.component';
import { ViewPlModalComponent } from './modals/view-pl-modal.component';
import { FinancesComponent } from './finances/finances.component';
import { CashBalanceComponent } from './cash-balance/cash-balance.component';
import { ChartsModule } from 'ng2-charts';
import { AllLocComponent } from './all-loc/all-loc.component';
import { AllLocSellerComponent } from './all-loc-seller/all-loc-seller.component';
import { ApproveLocComponent } from './approve-loc/approve-loc.component';
import { BillOfLadingComponent } from './bill-of-lading/bill-of-lading.component';
import { PackingListComponent } from './packing-list/packing-list.component';
import { InvoiceCreateComponent } from './invoice-create/invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component'
import { DashboardIssuerComponent } from './dashboard-issuer/dashboard-issuer.component';
import { DashboardAdvisingComponent } from './dashboard-advising/dashboard-advising.component';
import { DashboardBuyerComponent } from './dashboard-buyer/dashboard-buyer.component';
import { DashboardSellerComponent } from './dashboard-seller/dashboard-seller.component';
import { DashboardOverallComponent } from './dashboard-overall/dashboard-overall.component';
import { ShipComponent } from './ship/ship.component';
import { GoodsShippedComponent } from './goods-shipped/goods-shipped.component';
import { AllLocBuyerComponent } from './all-loc-buyer/all-loc-buyer.component';
import { DocsComponent } from './docs/docs.component';
import { AllLocAdvisingComponent } from './all-loc-advising/all-loc-advising.component';
//import { DocumentUploadComponent } from './document-upload/document-upload.component';
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { AllInvoiceComponent } from './all-invoice/all-invoice.component';
import { AllInvoiceSellerComponent } from './all-invoice-seller/all-invoice-seller.component';
import { LocStateViewComponent } from './loc-state-view/loc-state-view.component';
import { LocAppViewComponent } from './loc-app-view/loc-app-view.component';
import { AwaitingApprovalIssuerComponent } from './awaiting-approval-issuer/awaiting-approval-issuer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BillOfLadingViewComponent } from './bill-of-lading-view/bill-of-lading-view.component';
import { PackingListViewComponent } from './packing-list-view/packing-list-view.component';
import { LoginComponent } from './login/login.component';
import { CommaSeperatedNumberPipe } from './comma-seperated-number.pipe';
import { IdentityService } from './services/identity.service'
import { Ng2OdometerModule } from 'ng2-odometer';
import { TimelineComponent } from './timeline/timeline.component';
import { ViewBolTimelineModalComponent } from'./modals/view-bol-timeline-modal.component'
import { FeedbackComponent } from './feedback/feedback.component';
import { StatusService } from './services/status.service';
import { ShepherdService } from './services/shepherd.service';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { TourService } from './services/tour.service';
import { FooterComponent } from './footer/footer.component';
import { PortProviderService } from './services/port-provider.service';
import { UrlProviderService } from './services/url-provider.service';
import { SelectModule } from 'ng2-select';
import { LaunchComponent } from './launch/launch.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {
      passThruUnknownUrl: true
    }),
    AppRoutingModule,
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ChartsModule,
    Ng2OdometerModule.forRoot(),
    MatToolbarModule,
    SelectModule
  ],
  declarations: [
    AppComponent,
    ActiveLocComponent,
    ApplyForLocComponent,
    MainMenuComponent,
    HeaderComponent,
    AwaitingApprovalComponent,
    FinancesComponent,
    DatePickerComponent,
    ApplyModalComponent,
    DocsModalComponent,
    ShipModalComponent,
    CreatePlModalComponent,
    CreateBolModalComponent,
    CreateInvoiceModalComponent,
    ViewInvoiceModalComponent,
    ApproveLocModalComponent,
    ViewLocStateModalComponent,
    ViewLocAppModalComponent,
    ViewPlModalComponent,
    ViewBolModalComponent,
    CashBalanceComponent,
    AllLocComponent,
    AllLocSellerComponent,
    ApproveLocComponent,
    BillOfLadingComponent,
    PackingListComponent,
    InvoiceCreateComponent,
    InvoiceViewComponent,
    DashboardIssuerComponent,
    DashboardAdvisingComponent,
    DashboardBuyerComponent,
    DashboardSellerComponent,
    DashboardOverallComponent,
    ShipComponent,
    GoodsShippedComponent,
    AllLocBuyerComponent,
    DocsComponent,
    AllLocAdvisingComponent,
    //DocumentUploadComponent,
    //FileSelectDirective,
    //FileDropDirective,
    AllInvoiceComponent,
    AllInvoiceSellerComponent,
    LocStateViewComponent,
    LocAppViewComponent,
    AwaitingApprovalIssuerComponent,
    SpinnerComponent,
    BillOfLadingViewComponent,
    PackingListViewComponent,
    LoginComponent,
    CommaSeperatedNumberPipe,
    TimelineComponent,
    ViewBolTimelineModalComponent,
    FeedbackComponent,
    FooterComponent,
    LaunchComponent
],
  providers: [
    LocService,
    DocsService,
    CreditTypeService,
    CommonService,
    IssuingBankService,
    AdvisingBankService,
    RefreshService,
    IdentityService,
    StatusService,
    ShepherdService,
    CookieService,
    TourService,
    PortProviderService,
    UrlProviderService,
    { provide: CookieOptions, useValue: {} }
  ],
  entryComponents: [ApplyModalComponent, DocsModalComponent, ShipModalComponent, CreatePlModalComponent,
                    CreateBolModalComponent, CreateInvoiceModalComponent, ViewInvoiceModalComponent,
                    ApproveLocModalComponent, ViewLocStateModalComponent, ViewLocAppModalComponent,
                    ViewPlModalComponent, ViewBolModalComponent, ViewBolTimelineModalComponent,
                    MainMenuComponent, AllLocBuyerComponent, AllLocSellerComponent, DashboardSellerComponent,
                    AllInvoiceComponent, AwaitingApprovalComponent, BillOfLadingComponent, PackingListComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
