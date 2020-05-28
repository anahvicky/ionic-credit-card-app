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
  protected isScrolled = false;

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

  // async handleScroll(event) {
  //   const scrollEl = await event.target.getScrollElement();
  //   const scrollHeight = scrollEl.scrollHeight - scrollEl.clientHeight;
  //   console.log(scrollHeight);
  //   const scrollDept = event.detail.scrollTop;

  //   if (this.isScrolled) {
  //     if (scrollDept < scrollHeight) {
  //       console.log('apex');
  //       return;
  //     }
  //   }
  //   const percentage = 80;

  //   const triggerDept = ((scrollHeight / 100) * percentage);
  //   console.log(triggerDept);

  //   if (scrollDept > triggerDept) {
  //     console.log(`scrolled to ${percentage}%`);
  //     this.isScrolled = true;
  //   }
  // }

}
