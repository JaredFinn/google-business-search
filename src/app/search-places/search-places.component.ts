import { Component } from '@angular/core';
import { GoogleMapsService } from '../google-maps.service';

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent {
  query: string = '';
  places: any[] = [];

  constructor(private googleMapsService: GoogleMapsService) { }

  search(): void {
    this.googleMapsService.searchPlaces(this.query).subscribe(places => {
      this.places = []; // Reset places array for new search
      const detailObservables = [];
      places.forEach(place => {
        // Request place details for each place
        const detailObservable = this.googleMapsService.getPlaceDetails(place.place_id).subscribe(detail => {
          console.log(detail)
          if (!detail.website) {
            // Assuming 'detail' includes a 'phone' field with the place's phone number
            this.places.push({
              name: detail.name,
              place_id: place.place_id,
              phone: detail.formatted_phone_number // Use the actual property name from your service
            });
          }
        });
        detailObservables.push(detailObservable);
      });

      // Optionally, if you need to perform actions after all details have been fetched,
      // consider using RxJS's forkJoin with detailObservables as shown in previous examples.
    });
  }
}
