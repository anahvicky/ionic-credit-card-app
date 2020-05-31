import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { CardsService } from '../services/cards.service';
import * as payform from 'payform';

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
  }

  initFormCheck() {
    this.cardValidator.cVV = true;
    this.cardValidator.cardName = true;
    this.cardValidator.cardNumber = true;
    this.cardValidator.expDate = true;
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

    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      const maskedNum = parts.join(' ');
      this.creditCardForm.controls.cardNumber.setValue(maskedNum);
    } else {
      this.creditCardForm.value.cardNumber = value;
    }
  }


  // Check for Card Expiration Date Input
  checkCardExpDate(ev) {
    const expDate = ev.detail.value;

    const v = expDate.replace(/\s+/g, '');
    const matches = v.match(/\d{4}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }

    if (parts.length > 0) {
      const maskedExpDate = parts.join('/');
      this.creditCardForm.controls.ccExp.setValue(maskedExpDate);
    } else {
      this.creditCardForm.controls.ccExp.setValue(expDate);
    }

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
    const v = cvv.replace(/\s+/g, '');

    if (!payform.validateCardCVC(v) && v !== ''){
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
