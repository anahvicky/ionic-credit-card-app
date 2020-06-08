import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { CardsService } from '../services/cards.service';
import * as payform from 'payform';
import Cleave from 'cleave.js';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.page.html',
  styleUrls: ['./card-input.page.scss'],
})
export class CardInputPage implements OnInit {
  protected creditCard = '../../assets/images/card.png';
  protected creditCardForm: FormGroup;
  protected isScrolled = false;

  protected cardValidator = {
    cardNumber: true,
    cardName: true,
    expDate: true,
    cVV: true
  };

  constructor(
    private cardsService: CardsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.creditCardForm = this.fb.group({
      cardNumber: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cardHolderName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      ccExp: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      cardCVV: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(3)]
      }),
      isToRemember: new FormControl(null, {
        updateOn: 'change'
      })
    });

    const cardNum = new Cleave('#creditNum', {
        creditCard: true,
    });

    const cleave = new Cleave('#expDate', {
      date: true,
      datePattern: ['m', 'y']
    });
  }

  async handleScroll(event) {
    if (event && event.detail && event.detail.scrollTop) {
      const scrollEl = await event.target.getScrollElement();
      const scrollTop = event.detail.scrollTop;
      const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;

      if (this.isScrolled) {
        if (scrollTop < (scrollHeight - 10)) {
          this.isScrolled = false;
        }
      }

      if (!this.isScrolled) {
        if (scrollTop >= (scrollHeight - scrollTop)) {
          this.isScrolled = true;
        }
      }
    }
  }

  // Check for Card Number Input
  checkCardNumber(ev) {
    const value = ev.detail.value;

    if (!payform.validateCardNumber(value) && value !== ''){
      this.cardValidator.cardNumber = false;
    }else {
      this.cardValidator.cardNumber = true;
    }
  }


  // Check for Card Expiration Date Input
  checkCardExpDate(ev) {
    const expDate = ev.detail.value;

    if (expDate.length > 2) {
      const expValue = this.creditCardForm.value.ccExp;
      const split = expValue.split('/');
      if (!payform.validateCardExpiry(split[0], split[1])){
        this.cardValidator.expDate = false;
      }else {
        this.cardValidator.expDate = true;
      }
    }
  }


  // check for card cvv input
  checkcvv(ev) {
    const cvv = ev.detail.value;
    const v = cvv.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const num = v.match(/\d{4}/g) || v.match(/\d{3}/g);
    const match = (num && num[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 3) {
      parts.push(match.substring(i, i + 3));
    }

    if (parts.length > 1) {
      const cvv4Val = parts.join('');
      this.creditCardForm.controls.cardCVV.setValue(cvv4Val);
    } else {
      this.creditCardForm.controls.cardCVV.setValue(cvv);
    }

    const cvvForm = this.creditCardForm.value.cardCVV;

    if (!payform.validateCardCVC(cvvForm) && cvvForm !== ''){
      this.cardValidator.cVV = false;
    }else {
      this.cardValidator.cVV = true;
    }
  }


  // Onsubmit Card
  onSubmitCard(form: FormGroupDirective) {
    if (!this.creditCardForm.valid) {
      return;
    }

    const cardType = payform.parseCardType(this.creditCardForm.value.cardNumber);

    const cardData = {
      id: Math.floor(Math.random() * 3000) + Date.now(),
      type: cardType,
      number: this.creditCardForm.value.cardNumber,
      name: this.creditCardForm.value.cardHolderName
    };

    this.cardsService.addCard(cardData);
    this.resetForm(this.creditCardForm);
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.creditCardForm.setValue({
      cardNumber: null,
      cardHolderName: null,
      ccExp: null,
      cardCVV: null,
      isToRemember: null
    });
  }
}
