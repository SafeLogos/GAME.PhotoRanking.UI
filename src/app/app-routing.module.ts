import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhotoGroupDetailsComponent } from './components/photo-group-details/photo-group-details.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "group/:id", component: PhotoGroupDetailsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
