import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey = environment.googleMapsApiKey;
  private placesUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  private detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';

  constructor(private http: HttpClient) { }

  searchPlaces(query: string): Observable<any[]> {
    const url = `${this.placesUrl}?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results)
    );
  }

  getPlaceDetails(placeId: string): Observable<any> {
    // Include 'formatted_phone_number' in the fields parameter
    const fields = 'name,website,formatted_phone_number';
    const url = `${this.detailsUrl}?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.result)
    );
  }
}
