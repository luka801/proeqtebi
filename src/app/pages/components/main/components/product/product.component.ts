import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
@Input() item:any
@Output() productEmitter:EventEmitter<any> = new EventEmitter();

onAddToCartBtnClick(){
  this.productEmitter.emit(this.item);
}
}
