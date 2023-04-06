import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicoPreviewComponent } from './pico-preview.component';
import Jasmine = jasmine.Jasmine;
import {ProductsService} from "../../services/products.service";

describe('PicoPreviewComponent', () => {
  let component: PicoPreviewComponent;
  let fixture: ComponentFixture<PicoPreviewComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductsService', ['getSimpleProduct']);
    await TestBed.configureTestingModule({
      declarations: [PicoPreviewComponent],
      providers:[
        { provide: ProductsService, useValue: productService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PicoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
