import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {format,parseISO} from 'date-fns';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  productForm:FormGroup;
  modes=['date','date-time','month','time','time-date','year'];
  selectedMode='date';
  showPicker=false;
  dateValue = format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z';
  formattedString = '';
  constructor(private formBuilder:FormBuilder) {

    this.setToday();

    this.productForm=this.formBuilder.group({
    name:['',Validators.required],
    age:[null,Validators.required],
    suffering:[''],
    fecha:[''],
    
      });

    }

    setToday(){
      this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+'T09:00:00.000Z'),'HH:mm,MMM d, yyyy');
    }

    /* dateChanged (value) {
      console.log(value);
      this.formattedString = format(parseISO(value),'HH:mm,MM dd, yyyy');
    } */

    dateChanged (fecha: any){
      this.dateValue = fecha;
      this.formattedString = format(parseISO(fecha),'HH:mm,MMM d, yyyy');
      this.showPicker = false;
    }

}