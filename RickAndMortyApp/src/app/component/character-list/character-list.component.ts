import { Component, OnInit } from '@angular/core';
import { CharactersService } from './characters.service';
import { CharactersModel, Result } from 'src/app/models/characters.model';

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
  constructor(private characterService: CharactersService) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  /**
   * fetchCharacters
   *
   * @description - fetch all the characters of selected page.
   */
  fetchCharacters() {
    this.characterService.getCharacterList(this.pageNo).subscribe((data: CharactersModel) => {
      this.characterList.push(...data.results);
    });
  }

  /**
   * search
   *
   * @description - Triggers when user scroll down the page.
   */
  loadMore() {
    this.pageNo += 1;
    this.fetchCharacters();
  }

}
