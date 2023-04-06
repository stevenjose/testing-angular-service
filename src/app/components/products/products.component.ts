import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.products$ = this.productService.getSimpleProduct();
  }
}
