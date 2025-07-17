
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-basket-item',
  standalone: false,
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.css']
})
export class BasketItemComponent {
  @Input() card: any;
  @Output() updateCardEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteCardEmitter: EventEmitter<any> = new EventEmitter();

  onUpdateBtnClick(action: 'plus' | 'minus') {
    const copy = { ...this.card };
    let newQuantity = copy.quantity;

    if (action === 'plus') {
      newQuantity += 1;
    } else if (action === 'minus') {
      newQuantity -= 1;
    }

    if (newQuantity > 0) {
      const updatedCard = {
        quantity: newQuantity,
        price: copy.product.price * newQuantity,
        productId: copy.product.id
      };
      this.updateCardEmitter.emit(updatedCard);
    }
  }

  onDeleteBtnClick() {
    this.deleteCardEmitter.emit(this.card.product.id);
  }

 

}


