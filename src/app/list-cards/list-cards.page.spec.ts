import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCardsPage } from './list-cards.page';

describe('ListCardsPage', () => {
  let component: ListCardsPage;
  let fixture: ComponentFixture<ListCardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
