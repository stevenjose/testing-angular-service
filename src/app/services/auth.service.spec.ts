import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {User} from "../models/user.model";
import {Auth} from "../models/auth.model";

describe('Auth Service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = jasmine.createSpyObj('TokenService', ['saveToken']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provider: TokenService, useValue: tokenService}
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should created', function () {
    expect(authService)
      .toBeTruthy();
  });

  describe('test login', () => {
    const user: User = {
      id: '32332',
      email: 'lopezajoseg@gmail.com',
      password: 'xxxxxxxx',
      name: 'Jose G',
      role: 'admin'
    }
    let token: Auth = {
      access_token: 'Bearer 123'
    }
    it('login', function () {
      authService.login(user.email, user.password).subscribe((req) => {
        expect(req.access_token)
          .toBe(`Bearer 123`);
      });
      const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
      req.flush(token);
    });

    it('login to call saveToken', function () {
      spyOn(tokenService, "saveToken").and.callThrough();
      authService.login(user.email, user.password).subscribe((req) => {
        expect(req.access_token)
          .toBe(`Bearer 123`);
        expect(tokenService.saveToken)
          .toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken)
          .toHaveBeenCalledOnceWith('Bearer 123');
      });
      const req = httpController.expectOne(`${environment.API_URL}/api/auth/login`);
      req.flush(token);
    });

  });

})
