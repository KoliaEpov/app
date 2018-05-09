import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../shared/order.service';
import { Order } from '../shared/order.interface';

@Component({
  selector: 'app-order-detail-component',
  templateUrl: './order-detail-component.component.html',
  styleUrls: ['./order-detail-component.component.scss']
})

export class OrderDetailComponent implements OnInit {
  
  public order: Order;
  public order_id: number;
  public ratingStars: number[] = [1, 2, 3, 4, 5];

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.order_id = parseInt(params.id, 10);
    });
    this.order = this.getOrder(this.order_id);
  }
  
  getOrder(id: number): Order {
    return this.orderService.getOrder(id);
  }
  
  setRating(value: string): void {
    this.order.rating = parseInt(value, 10);
  }
  
  handleSubmit(): void {
    this.orderService.updateOrder(this.order);
    this.router.navigateByUrl('');
  }

}
