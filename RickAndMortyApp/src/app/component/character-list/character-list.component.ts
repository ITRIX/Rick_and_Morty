import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CharactersModel } from 'src/app/models/characters.model';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characterList: any = [];
  throttle = 300;
  scrollDistance = 1;
  pageNo = 1;
  form: FormGroup;
  genders = [];
  statusList = [];
  loading = false;
  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
    this.genders = this.characterService.getGenderList();
    this.statusList = this.characterService.getstatusList();
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
   * fetchCharacters
   *
   * @description - fetch all the characters of selected page.
   */
  fetchCharacters(): void {
    this.loading = true;
    const searchQuery = this.generateQuery();
    this.characterService.getCharacterList(searchQuery).subscribe((data: CharactersModel) => {
      this.characterList.push(...data.results);
      this.loading = false;
    }, (error: any) => {
      this.loading = false;
    });
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
   * generateQuery
   *
   * @description - create query params for the api.
   */
  generateQuery(): string {
    const queryArray = [];
    queryArray.push(`?page=${this.pageNo}`);
    if (this.userSearchFieldControl.value !== '') { queryArray.push(`&name=${this.userSearchFieldControl.value}`); }
    if (this.genderControl.value.id) { queryArray.push(`&gender=${this.genderControl.value.name}`); }
    if (this.statusControl.value.id) { queryArray.push(`&status=${this.statusControl.value.name}`); }
    return queryArray.join('');
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
}
