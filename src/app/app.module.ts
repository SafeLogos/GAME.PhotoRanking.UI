import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TosterComponent } from './components/toster/toster.component';
import { BubblesComponent } from './components/bubbles/bubbles.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReversePipe } from './pipes/reverse.pipe';
import { PhotoGroupDetailsComponent } from './components/photo-group-details/photo-group-details.component';
import { GameComponent } from './components/game/game.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    TosterComponent,
    BubblesComponent, 
    ReversePipe,
    PhotoGroupDetailsComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    provideHttpClient(withInterceptorsFromDi())
    //provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
