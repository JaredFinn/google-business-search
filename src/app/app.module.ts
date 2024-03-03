import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this
import { HttpClientModule } from '@angular/common/http'; // And this
import { AppComponent } from './app.component';
import { SearchPlacesComponent } from '../app/search-places/search-places.component'; // Adjust to your file structure
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchPlacesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Include it here
    HttpClientModule // And here
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
