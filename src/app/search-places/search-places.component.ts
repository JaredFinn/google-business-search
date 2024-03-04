import { Component } from '@angular/core';
import { GoogleMapsService } from '../google-maps.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SearchResult {
  query: string;
  places: any[];
}

@Component({
  selector: 'app-search-places',
  templateUrl: './search-places.component.html',
  styleUrls: ['./search-places.component.css']
})
export class SearchPlacesComponent {
  query: string = '';
  searchResults: SearchResult[] = [];
  noResultsFound: boolean = false; // Flag to track if no results were found
  error_search: string = '';

  constructor(private googleMapsService: GoogleMapsService) { }

  search(): void {
    this.googleMapsService.searchPlaces(this.query).subscribe(initialPlaces => {
      this.noResultsFound = false;
      if (initialPlaces.length === 0) {
        return; // No places found, so don't do anything further
      }
      const detailObservables = initialPlaces.map(place =>
        this.googleMapsService.getPlaceDetails(place.place_id)
      );

      forkJoin(detailObservables).subscribe(details => {
        // Filter out places without a website
        const placesWithDetails = details.filter(detail => !detail.website).map(detail => ({
          name: detail.name,
          place_id: detail.place_id,
          phone: detail.formatted_phone_number,
        }));

        if (placesWithDetails.length > 0) {
          this.searchResults.push({ query: this.query, places: placesWithDetails });
        }else{
          this.error_search = this.query;
          this.noResultsFound = true;
        }
      });
    });
  }
}
