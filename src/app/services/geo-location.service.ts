import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {
  API_URL = environment.API_URL;
  constructor(public http: HttpClient) { }
}
