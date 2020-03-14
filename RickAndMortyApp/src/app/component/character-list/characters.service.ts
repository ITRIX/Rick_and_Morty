import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  configUrl = environment.URL;

  constructor(private http: HttpClient) { }

  /**
   * getCharacterList
   *
   * @description - Fetch the character list
   */
  getCharacterList(pageNo) {
    let url;
    url = `${this.configUrl}?page=${pageNo}`;
    return this.http.get(url);
  }
}
