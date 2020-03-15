import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CharactersModel, Result } from 'src/app/models/characters.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characterList: any = [];
  throttle = 300;
  scrollDistance = 2;
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
      gender: new FormControl(this.genders[0]),
      status: new FormControl(this.statusList[0])
    });
    this.fetchCharacters();
  }

  /**
   * genderControl
   *
   * @description - returns FormControl object
   */
  get genderControl() {
    return this.form.get('gender');
  }

  /**
   * statusControl
   *
   * @description - returns FormControl object
   */
  get statusControl() {
    return this.form.get('status');
  }

  /**
   * fetchCharacters
   *
   * @description - fetch all the characters of selected page.
   */
  fetchCharacters() {
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
  loadMore() {
    this.pageNo += 1;
    this.fetchCharacters();
  }

  /**
   * generateQuery
   *
   * @description - create query params for the api.
   */
  generateQuery() {
    const genderStr = this.genderControl.value.id ? `gender=${this.genderControl.value.name}` : '';
    const statusStr = this.statusControl.value.id ? `status=${this.statusControl.value.name}` : '';
    const query = `${statusStr !== '' ? genderStr + '&' : genderStr}${statusStr}`;
    return query === '' ? `?page=${this.pageNo}` : `?${query}&page=${this.pageNo}`;
  }

  /**
   * onFilterChange
   *
   * @description - Triggers when user selct from dropdowns.
   */
  onFilterChange() {
    this.pageNo = 1;
    this.characterList = [];
    this.fetchCharacters();
  }
}
