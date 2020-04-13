import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatIconRegistry } from "@angular/material/icon";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";

import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRippleModule } from "@angular/material/core";
import { MatRadioModule } from "@angular/material/radio";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSliderModule } from "@angular/material/slider";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { CovalentCommonModule } from "@covalent/core/common";
import { CovalentLayoutModule } from "@covalent/core/layout";
import { CovalentMediaModule } from "@covalent/core/media";
import { CovalentExpansionPanelModule } from "@covalent/core/expansion-panel";
import { CovalentStepsModule } from "@covalent/core/steps";
import { CovalentLoadingModule } from "@covalent/core/loading";
import { CovalentDialogsModule } from "@covalent/core/dialogs";
import { CovalentSearchModule } from "@covalent/core/search";
import { CovalentPagingModule } from "@covalent/core/paging";
import { CovalentNotificationsModule } from "@covalent/core/notifications";
import { CovalentMenuModule } from "@covalent/core/menu";
import { CovalentDataTableModule } from "@covalent/core/data-table";
import { CovalentMessageModule } from "@covalent/core/message";

//import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DomSanitizer } from "@angular/platform-browser";
import { LoginService } from "./auth/login.service";
import { routing } from "./app.routing";
import { ErrorInterceptor } from "./auth/error.interceptor";
import { BasicAuthInterceptor } from "./auth/auth.interceptor";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { BookService } from "./service/book.service";
import { AdvertisementComponent } from "./advertisement/advertisement.component";

import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookListComponent } from "./book-list/book-list.component";
import { LoginComponent } from "./pages/login/login.component";
import { BookFormComponent } from "./book-form/book-form.component";
import { BlogService } from "./service/blog.service";
import { UserService } from "./service/user.service";
import { AdvertisementService } from "./service/advertisement.service";
import { SearchService } from "./service/search.service";
import { HeaderComponent } from "./components/header/header.component";
import { blogListComponent } from "./blog-list.component";
import { HomeComponent } from './pages/home/home.component';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { blogSingleComponent } from './blog-single.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    /** Material Modules */
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatInputModule,
    /** Covalent Modules */
    CovalentCommonModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentExpansionPanelModule,
    CovalentStepsModule,
    CovalentDialogsModule,
    CovalentLoadingModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentDataTableModule,
    CovalentMessageModule,
    /** Additional **/
    //NgxChartsModule,
    routing,
  ],
  declarations: [
    AppComponent,
    BookDetailComponent,
    BookListComponent,
    AdvertisementComponent,
    BookFormComponent,
    LoginComponent,
    HeaderComponent,
    blogListComponent,
    blogSingleComponent,
    HomeComponent,
    RecomendacionesComponent,
    RegisterComponent,
    FavoritosComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    BookService,
    LoginService,
    BlogService,
    UserService,
    AdvertisementService,
    SearchService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl("/assets/symbol-defs.svg")
    );
  }
}
