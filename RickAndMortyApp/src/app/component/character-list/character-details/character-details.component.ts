import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  characterDetails: any = {};
  isError: boolean;
  loading: boolean;
  constructor(private characterService: CharactersService,
              private router: Router,
              private route: ActivatedRoute
            ) { }

  ngOnInit(): void {
    this.isError = false;
    this.loading = true;
    const characterID = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacterDetails(characterID).subscribe((data: any) => {
      this.characterDetails = data;
      this.loading = false;
    }, (error => {
      this.isError = true;
      this.loading = false;
    }));
  }

  /**
   * navigateBack
   *
   * @description - Triggers when user clicks back button.
   */
  navigateBack(): void {
    this.router.navigate(['/characters']);
  }

}
