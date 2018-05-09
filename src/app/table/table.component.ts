import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  
  public orders: Array<Order> = [];
  public ordersShowing: Array<Order> = [];
  public Arr = Array;
  public maxRating = 5;
  public subscription: Subscription;
  
  constructor(private orderService: OrderService) { }
  
  ngOnInit(): void  {
    this.setOrdersArrayOnStart();
    this.initializeOrderList();
  }
  
  initializeOrderList(): void {
    this.subscription = this.orderService.getNewOrder().pipe(
        tap((data: Order) => {
          this.orders.unshift(data);
          this.setShowingOrders(this.orders);
        }),
        catchError((error: Error) => {
          console.log(error);
          return Observable.throw(error);
        })
    ).subscribe();
  }
  
  closeOrder(orderId: number): void {
    this.orders = this.orders.filter((order: Order) => order.order_id !== orderId);
    this.setShowingOrders(this.orders);
  }
  
  setOrdersArrayOnStart(): void {
    this.orders = this.orderService.getOrderList();
    this.setShowingOrders(this.orders);
  }
  
  setShowingOrders(orderList: Array<Order>): void {
    const orderListLength = orderList.length;
    this.orderService.setOrderList(orderList);
    this.ordersShowing = orderListLength > 9 ? orderList.slice(0, 9) : orderList.slice(0, orderListLength);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}


