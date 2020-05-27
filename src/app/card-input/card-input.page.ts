import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.page.html',
  styleUrls: ['./card-input.page.scss'],
})
export class CardInputPage implements OnInit {
  protected creditCard = '../../assets/images/card.png';
  protected creditCardForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.creditCardForm = new FormGroup({
      cardHolderName: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

}
