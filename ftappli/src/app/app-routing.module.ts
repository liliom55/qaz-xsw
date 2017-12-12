import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { CatalogComponent }   from './catalog/catalog.component';
import { GoodbyeComponent }   from './goodbye/goodbye.component';
// /:config=DMPNQLRRFK11.json
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'catalog/:id', component: CatalogComponent },
  { path: 'goodbye',     component: GoodbyeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ],
  providers:[]
})
export class AppRoutingModule {}
