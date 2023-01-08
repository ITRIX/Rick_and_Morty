import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/models/characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  /**
   * Gender list of characters service
   * @static
   * @type {Filter[]}
   * @memberof CharactersService
   */
  public static readonly genderList: Filter[] = [
    { id: 0, name: 'Select Gender' },
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'genderless' },
    { id: 4, name: 'unknown' }
  ];
  /**
   * Status list of characters service
   * @static
   * @type {Filter[]}
   * @memberof CharactersService
   */
  public static readonly statusList: Filter[] = [
    { id: 0, name: 'Select Status' },
    { id: 1, name: 'Alive' },
    { id: 2, name: 'Dead' },
    { id: 3, name: 'unknown' },
  ];
  /**
   * Config url of characters service
   * @memberof CharactersService
   */
  configUrl = environment.URL;
  /**
   * Creates an instance of CharactersService.
   * @param {HttpClient} http
   * @memberof CharactersService
   */
  constructor(private http: HttpClient) { }
  /**
   * getCharacterList
   *
   * @description - Fetch the character list
   */
  getCharacterList(searchQuery: string): Observable<any> {
    return this.http.get(`${this.configUrl}${searchQuery}`);
  }
  /**
   * getCharacterDetails
   *
   * @description - Fetch the character by id
   */
  getCharacterDetails(id: string): Observable<any> {
    return this.http.get(`${this.configUrl}${id}`);
  }
}
