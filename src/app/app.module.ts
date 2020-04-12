import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleAuthComponent } from 'src/app/components/google-auth/google-auth.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

import { AppMaterialModule } from './app-material.module';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './components/map/map.component';
import { LocationService } from './services/location/location.service';
import { MainComponent } from './components/main/main.component';
import { BookingsService } from './services/bookings/bookings.service';
import { SlotsComponent } from './components/slots/slots.component';
import { UserSlotsComponent } from './components/user-slots/user-slots.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleAuthComponent,
    HeaderComponent,
    ProfileInfoComponent,
    MapComponent,
    MainComponent,
    SlotsComponent,
    UserSlotsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [
    AuthService,
    LocationService,
    BookingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
