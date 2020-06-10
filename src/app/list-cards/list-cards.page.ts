import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.page.html',
  styleUrls: ['./list-cards.page.scss'],
})
export class ListCardsPage implements OnInit {
  protected visa = '../../assets/images/visa.png';
  protected master = '../../assets/images/master.png';
  protected verve = '../../assets/images/verve.png';
  protected others = '../../assets/images/verve.png';
  protected noCard = '../../assets/images/credit_card.png';
  protected card = '../../assets/images/other-cards.png';

  protected isCardLoading = true;
  protected listCards: any;

  constructor(
    private router: Router,
    private cardService: CardsService
  ) { }

  ngOnInit() {
    this.cardService.cards.subscribe(cards => {
      this.isCardLoading = false;
      this.listCards = cards;
    });
  }

  inputCard() {
    this.router.navigateByUrl('input');
  }

  removeCard(id: string) {
    this.cardService.removeCard(id);
  }
}
