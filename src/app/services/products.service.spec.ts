import {TestBed} from "@angular/core/testing";
import {ProductsService} from "./products.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";
import {CreateProductDTO, Product, UpdateProductDTO} from "../models/product.model";
import {of} from "rxjs";
import {HTTP_INTERCEPTORS, HttpStatusCode} from "@angular/common/http";
import {TokenInterceptor} from "../../interceptors/token.interceptor";
import {TokenService} from "./token.service";

describe('Product Service', () => {
  let productService: ProductsService;
  let httController: HttpTestingController;
  const product: Product = {
    id: "1",
    title: 'iphone 15',
    description: 'movil de nueva generacion',
    price: 1500,
    images: ['img1'],
    category: {
      id: 11,
      name: 'moviles'
    }
  }
  let tokenService: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        TokenService,
        {
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
        }
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    productService = TestBed.inject(ProductsService);
    httController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(()=>{
    httController.verify();
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

  describe('shold getAll', () => {
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
      ];
      spyOn(tokenService, 'getToken').and.returnValue('123');
      productService.getAll().subscribe((req: Product[]) => {
        expect(req[0].id).toBe(mockProduct[0].id);
      });
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products`);
      req.flush(mockProduct);
      expect(req.request.method)
        .toBe('GET');
      expect(req.request.headers.get('Authorization'))
        .toEqual('Bearer 123');
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
  });

  describe('should create', () => {
    const dtoProduct: CreateProductDTO = {
      title: 'iphone 15',
      description: 'movil de nueva generacion',
      price: 1500,
      images: ['img1'],
      categoryId: 1
    };

    it('should create product', function (doneFn) {
      productService.create({...dtoProduct}).subscribe((req) => {
        expect(req)
          .toBe(product);
        doneFn();
      });

      const req = httController.expectOne(`${environment.API_URL}/api/v1/products`);
      // valor que devuelve el servicio cuando sea invocado
      req.flush(product);
      expect(req.request.method)
        .toBe('POST');
      expect(req.request.body)
        .toEqual(dtoProduct);
    });

  });

  describe('actualizar producto', ()=>{
    it('should update()', function (donFn) {
      const id = 1;
      const update: UpdateProductDTO = {
        description: 'update'
      }
      const productUpdate = {...product, description:'update'}
      productService.fetchReadAndUpdate(`${id}`, update);
      spyOn(productService,'fetchReadAndUpdate').and.returnValue(of([product, productUpdate]));
      productService.fetchReadAndUpdate('1', update).subscribe((values, ) =>{
        expect(values.length)
          .toBe(2);
        const {description} = update;
        expect(values[1].description)
          .toEqual(description ? description : '');
        donFn();
      });
    });
  });

  describe('test delete', ()=> {
    it('should delete id 1',
      function (doneFN) {
        const id = "1";
        productService.delete(id).subscribe((req) => {
          expect(req)
            .toBeTrue();
          doneFN();
        });
        const req = httController.expectOne(`${environment.API_URL}/api/v1/products/${id}`);
        req.flush(true);
        expect(req.request.method)
          .toBe('DELETE');
      });
  });

  describe('test getOne', ()=> {
    it('should messague 404', function (doneFN) {
      const productId = '1';
      const msgError = 'El producto no existe';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }
      productService.getOne(productId).subscribe({
        error:(err)=>{
          expect(err)
            .toBe(msgError);
          doneFN();
        }
      })
      const req = httController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
      req.flush(msgError,mockError);
      expect(req.request.method).toBe('GET');
    });
  });

  it('should messague 401', function (doneFN) {
    const productId = '1';
    const msgError = 'No estas permitido';
    const mockError = {
      status: HttpStatusCode.Unauthorized,
      statusText: msgError
    }
    productService.getOne(productId).subscribe({
      error:(err)=>{
        expect(err)
          .toBe(msgError);
        doneFN();
      }
    })
    const req = httController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
    req.flush(msgError,mockError);
    expect(req.request.method).toBe('GET');
  });

  it('should messague 409', function (doneFN) {
    const productId = '1';
    const msgError = 'Algo esta fallando en el server';
    const mockError = {
      status: HttpStatusCode.Conflict,
      statusText: msgError
    }
    productService.getOne(productId).subscribe({
      error:(err)=>{
        expect(err)
          .toBe(msgError);
        doneFN();
      }
    })
    const req = httController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
    req.flush(msgError,mockError);
    expect(req.request.method).toBe('GET');
  });

  it('should messague 409', function (doneFN) {
    const productId = '1';
    const msgError = 'Ups algo salio mal';
    const mockError = {
      status: HttpStatusCode.BadGateway,
      statusText: msgError
    }
    productService.getOne(productId).subscribe({
      error:(err)=>{
        expect(err)
          .toBe(msgError);
        doneFN();
      }
    })
    const req = httController.expectOne(`${environment.API_URL}/api/v1/products/${productId}`);
    req.flush(msgError,mockError);
    expect(req.request.method).toBe('GET');
  });


});

