import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { blogListComponent } from './blog-list.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';



const appRoutes = [
  { path: 'home', component: HomeComponent},
  { path: 'advertisement', component: AdvertisementComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'favoritos/:id', component: FavoritosComponent },
  { path: 'book/new', component: BookFormComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'book/edit/:id', component: BookFormComponent },
  // { path: '', redirectTo: 'advertisement', pathMatch: 'full' },
  { path: 'blog', component: blogListComponent },
  { path: '', pathMatch:'full' ,redirectTo: 'home'},
 
];

export const routing = RouterModule.forRoot(appRoutes);
