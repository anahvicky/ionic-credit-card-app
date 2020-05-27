import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardInputPage } from './card-input.page';

describe('CardInputPage', () => {
  let component: CardInputPage;
  let fixture: ComponentFixture<CardInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
