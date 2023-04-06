import {TestBed} from "@angular/core/testing";
import {ProductsService} from "./products.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {Product} from "../models/product.model";
import {ProductsComponent} from "../components/products/products.component";

describe('Product Service', () => {
  let productService: ProductsService;
  let httController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    productService = TestBed.inject(ProductsService);
    httController = TestBed.inject(HttpTestingController);
  });

  it('should created', function () {
    expect(productService).toBeTruthy();
  });
  describe('getSimple', () => {
    it('should getSimple()', function () {
      const mockProduct: Product[] = [
        {
          id: '8889',
          price: 8888,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          taxes: 8890,
          images: ['img1'],
          description: 'calvin klain'
        }
      ]
      productService.getSimpleProduct().subscribe((req: Product[]) => {
        expect(req).toBe(mockProduct);
        expect(req[0].id).toBe(mockProduct[0].id);

      });
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockProduct);
      expect(req.request.method).toBe('GET');
      httController.verify();
    });
  })

  describe('shold Product Service getAll', ()=>{
    it('return Product getAll()', function () {
      const mockProduct: Product[] = [
        {
          id: '8889',
          price: 100,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          taxes: 8890,
          images: ['img1'],
          description: 'calvin klain'
        }
      ]
      productService.getAll().subscribe((req: Product[]) => {
        expect(req[0].id).toBe(mockProduct[0].id);
      });
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockProduct);
      expect(req.request.method).toBe('GET');
      httController.verify();
    });

    it('return witch query params', function (donFn) {
      const mockProduct: Product[] = [
        {
          id: '8889',
          price: 100,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          images: ['img1'],
          description: 'calvin klain'
        },
        {
          id: '8889',
          price: -19,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          images: ['img1'],
          description: 'calvin klain'
        },
        {
          id: '990',
          price: 0,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          images: ['img1'],
          description: 'calvin klain'
        }
      ];
      productService.getAll().subscribe((req: Product[]) => {
        expect(req[0].taxes).toBe(19);
        expect(req[1].taxes).toBe(0);
        expect(req[2].taxes).toBe(0);
        donFn();
      });
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockProduct);
      expect(req.request.method).toBe('GET');
      httController.verify();
    });

    it('return Product getAll()', function () {
      const mockProduct: Product[] = [
        {
          id: '8889',
          price: 100,
          title: 'Product',
          category: {
            id: 8998,
            name: 'Perfumes'
          },
          taxes: 8890,
          images: ['img1'],
          description: 'calvin klain'
        }
      ]
      const limit = 10;
      const offset = 3;
      productService.getAll(limit, offset).subscribe((req: Product[]) => {
        expect(req[0].id).toBe(mockProduct[0].id);
      });
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`);
      req.flush(mockProduct);
      expect(req.request.method)
        .toBe('GET');
      expect(req.request.params.get('limit'))
        .toBe(`${limit}`);
      expect(req.request.params.get('offset'))
        .toBe(`${offset}`);
      httController.verify();
    });
  })

})
