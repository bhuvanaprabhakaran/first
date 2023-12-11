import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  newform = new FormGroup({
    number: new FormControl()
  });

  data: any[] = [];

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      mobileno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', [Validators.required])
    });
  }

  onsubmit() {
    let num = this.newform.controls.number.value;
    if (num <= 0 && this.data.length === 0) {
      this.data = [];
      this.newform.reset();
      return;
    } else {
      for (let i = 0; i < num; i++) {
        const newFormGroup = this.createFormGroup();
        this.data.push({
          num1: '',
          num2: '',
          num3: '',
          submittedData: null,
          showPopup: false,
          form: newFormGroup
        });
      }
    }
    this.newform.reset();
  }

  onFormSubmit(item: any) {
    if (item.form.valid) {
      item.submittedData = {
        num1: item.form.value.name,
        num2: item.form.value.mobileno,
        num3: item.form.value.address
      };
      item.form.reset();
    } else {
      item.form.markAllAsTouched();
    }
  }

  onEdit(index: number) {
    const selectedItem = this.data[index];
    selectedItem.num1 = selectedItem.submittedData.num1;
    selectedItem.num2 = selectedItem.submittedData.num2;
    selectedItem.num3 = selectedItem.submittedData.num3;
  }


  onUpdate(index: number) {
    const selectedItem = this.data[index];
    if (selectedItem.form.valid) {
      selectedItem.submittedData = {
        num1: selectedItem.form.value.name,
        num2: selectedItem.form.value.mobileno,
        num3: selectedItem.form.value.address
      };
      selectedItem.form.reset();
      selectedItem.showPopup = false;
    } else {
      selectedItem.form.markAllAsTouched();
    }
  }

  onDelete(index: number) {
    const selectedItem = this.data[index];
    selectedItem.submittedData = null;
    selectedItem.showPopup = false;
  }

  showPopup(index: number) {
    const selectedItem = this.data[index];
    selectedItem.showPopup = true;
  }

  confirmDelete(index: number) {
    const selectedItem = this.data[index];
    selectedItem.submittedData = null;
    selectedItem.showPopup = false;
  }

  cancelDelete(index: number) {
    const selectedItem = this.data[index];
    selectedItem.showPopup = false;
  }
  popup = false;
  itemToDelete: any;

  prepareDelete(item: any) {
    this.itemToDelete = item;
    this.showPopupform();
  }

  deleteForm() {
    if (this.itemToDelete) {
      const index = this.data.indexOf(this.itemToDelete);
      if (index !== -1) {
        this.data.splice(index, 1);
        this.itemToDelete = null;
      }
    }
    this.popup = false;
  }

  cancelForm() {
    this.popup = false;
  }
  
  showPopupform() {
    this.popup = true;
  }

}
