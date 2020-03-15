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
  getCharacterList(searchQuery) {
    let url;
    url = `${this.configUrl}${searchQuery}`;
    return this.http.get(url);
  }

  /**
   * getGenderList
   *
   * @description - Fetch the list of genders
   */
  getGenderList() {
    return [
      { id: 0, name: 'Select Gender' },
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' },
      { id: 3, name: 'genderless' },
      { id: 4, name: 'unknown' }
    ];
  }

  /**
   * getstatusList
   *
   * @description - Fetch the list of status
   */
  getstatusList() {
    return [
      { id: 0, name: 'Select Status' },
      { id: 1, name: 'Alive' },
      { id: 2, name: 'Dead' },
      { id: 3, name: 'unknown' },
    ];
  }
}
