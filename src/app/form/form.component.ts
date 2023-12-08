import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  newform = new FormGroup({
    number : new FormControl()
  })
   data : any = []

   num1 :any ;
   num2 :any ;
   num3 : any ;
   
   onsubmit() {
    let num = this.newform.controls.number.value;
    if (num <= 0 && this.data.length === 0) {
      this.data = []; 
      this.newform.reset();
      return; 
    } else {
      for (let i = 0; i < num; i++) {
        this.data.push({});
        this.newform.reset();
      }
    }
  }
  onFormSubmit(item: any) {
    item.submitted = true;
}
 }
