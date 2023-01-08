import { Filter, Result } from './../../models/characters.model';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { Characters } from 'src/app/models/characters.model';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  /**
   * Character list of character list component
   * @private
   * @type {Result[]}
   * @memberof CharacterListComponent
   */
  private characterList: Result[] = [];
  /**
   * Characters of character list component
   * @type {Observable<Result[]>}
   * @memberof CharacterListComponent
   */
  characters$: Observable<Result[]>
  /**
   * Throttle of character list component
   * @memberof CharacterListComponent
   */
  throttle = 300;
  /**
   * Scroll distance of character list component
   * @memberof CharacterListComponent
   */
  scrollDistance = 1;
  /**
   * Page no of character list component
   * @memberof CharacterListComponent
   */
  pageNo = 1;
  /**
   * Form of character list component
   * @type {FormGroup}
   * @memberof CharacterListComponent
   */
  form: FormGroup;
  /**
   * Genders of character list component
   * @type {Filter[]}
   * @memberof CharacterListComponent
   */
  genders: Filter[] = [];
  /**
   * Status list of character list component
   * @type {Filter[]}
   * @memberof CharacterListComponent
   */
  statusList: Filter[] = [];
  /**
   * Creates an instance of CharacterListComponent.
   * @param {CharactersService} characterService
   * @memberof CharacterListComponent
   */
  constructor(private characterService: CharactersService) { }

  /**
   * on init
   * @memberof CharacterListComponent
   */
  ngOnInit(): void {
    this.genders = CharactersService.genderList;
    this.statusList = CharactersService.statusList;
    this.form = new FormGroup({
      userSearchField: new FormControl(''),
      gender: new FormControl(this.genders[0]),
      status: new FormControl(this.statusList[0])
    });
    this.userSearchFieldControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(value => {
      this.onFilterChange();
    });
    this.fetchCharacters();
  }
  /**
   * fetchCharacters
   *
   * @description - fetch all the characters of selected page.
   */
  fetchCharacters(): void {
    const searchQuery = this.generateQuery();
    this.characterService.getCharacterList(searchQuery).pipe(
      map((res: Characters) => res.results),
      tap((res: Result[]) => {
        this.characterList.push(...res)
        this.characters$ =  of(this.characterList);
      })).subscribe();
  }
  /**
   * loadMore
   *
   * @description - Triggers when user scroll down the page.
   */
  loadMore(): void {
    this.pageNo += 1;
    this.fetchCharacters();
  }
  /**
   * onFilterChange
   *
   * @description - Triggers when user selct from dropdowns.
   */
  onFilterChange(): void {
    this.pageNo = 1;
    this.characterList = [];
    this.fetchCharacters();
  }
  /**
   * userSearchFieldControl
   *
   * @description - returns FormControl object
   */
  get userSearchFieldControl(): AbstractControl {
    return this.form.get('userSearchField');
  }
  /**
   * genderControl
   *
   * @description - returns FormControl object
   */
  get genderControl(): AbstractControl {
    return this.form.get('gender');
  }
  /**
   * statusControl
   *
   * @description - returns FormControl object
   */
  get statusControl(): AbstractControl {
    return this.form.get('status');
  }
  /**
   * Generates query
   * @private
   * @returns {string}
   * @memberof CharacterListComponent
   */
  private generateQuery(): string {
    const queryArray = [];
    queryArray.push(`?page=${this.pageNo}`);
    if (this.userSearchFieldControl.value !== '') { queryArray.push(`&name=${this.userSearchFieldControl.value}`); }
    if (this.genderControl.value.id) { queryArray.push(`&gender=${this.genderControl.value.name}`); }
    if (this.statusControl.value.id) { queryArray.push(`&status=${this.statusControl.value.name}`); }
    return queryArray.join('');
  }
}
