import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Product} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-pico-preview',
  templateUrl: './pico-preview.component.html',
  styleUrls: ['./pico-preview.component.scss'],
})
export class PicoPreviewComponent {
  products$: Observable<Product[]> | undefined;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.products$ = this.productService.getSimpleProduct();
  }
}
