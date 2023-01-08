import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  /**
   * Character details$ of character details component
   * @type {Observable<any>}
   * @memberof CharacterDetailsComponent
   */
  characterDetails$: Observable<any>;
  /**
   * Creates an instance of CharacterDetailsComponent.
   * @param {CharactersService} characterService
   * @param {Router} router
   * @param {ActivatedRoute} route
   * @memberof CharacterDetailsComponent
   */
  constructor(private characterService: CharactersService, private router: Router, private route: ActivatedRoute){ }
  /**
   * on init
   * @memberof CharacterDetailsComponent
   */
  ngOnInit(): void {
    const characterID = this.route.snapshot.paramMap.get('id');
    this.characterDetails$ = this.characterService.getCharacterDetails(characterID);
  }
  /**
   * Navigates back
   * @memberof CharacterDetailsComponent
   */
  navigateBack(): void {
    this.router.navigate(['/characters']);
  }
}
