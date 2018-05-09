import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Observable';

import { Order } from './order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orders: Array<Order> = [];
  
  constructor(private socket: Socket) {
  }
  
  getNewOrder(): Observable<Order> {
    return Observable.create((observer) => {
      this.socket.on('order', (order) => {
        observer.next(order);
      });
    });
  }
  
  getOrderList(): Array<Order> {
    return this.orders;
  }
  
  updateOrder(modifyOrder: Order): void {
    // for (let i = 0; i < this.orders.length; i++) {
    //   if (this.orders[i].order_id === modifyOrder.order_id) {
    //     this.orders[i].rating = modifyOrder.rating;
    //     break;
    //   }
    // }
  }
  
  setOrderList(orderList: Array<Order>): void {
    this.orders = orderList;
  }
  
  getOrder(id: number): Order {
    return this.orders.find((order) => order.order_id === id);
  }
  
}
