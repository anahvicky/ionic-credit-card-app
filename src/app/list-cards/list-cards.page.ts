import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.page.html',
  styleUrls: ['./list-cards.page.scss'],
})
export class ListCardsPage implements OnInit {
  protected visa = '../../assets/images/visa.png';
  protected master = '../../assets/images/master.png';
  protected verve = '../../assets/images/verve.png';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  inputCard() {
    this.router.navigateByUrl('input');
  }
}
