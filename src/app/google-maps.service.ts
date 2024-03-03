import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private functionUrl = '/.netlify/functions/googlemapsproxy'; // URL to the Netlify Function

  constructor(private http: HttpClient) { }

  searchPlaces(query: string): Observable<any[]> {
    const url = `${this.functionUrl}?path=textsearch&query=${encodeURIComponent(query)}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results)
    );
  }

  getPlaceDetails(placeId: string): Observable<any> {
    const fields = 'name,website,formatted_phone_number';
    const url = `${this.functionUrl}?path=details&place_id=${placeId}&fields=${fields}`;
    return this.http.get<any>(url).pipe(
      map(response => response.result)
    );
  }
}
