//import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';
import { devOnlyGuardedExpression } from '@angular/compiler';
import { fakeAsync } from '@angular/core/testing';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Test for getValue', () => {
    it('should return my value', function () {
      expect(service.getValue()).toBe('my value');
    });
  });
  describe('Test for setGetValue', () => {
    it('should return my value', function () {
      service.setValue('first');
      expect(service.getValue()).toBe('first');
    });
  });
  describe('Test for getPromiseValue', () => {
    it('should return promise value', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('Test for getObservable', () => {
    it('should return getObservable observable value', fakeAsync(() => {
      service.getObserbleValue().subscribe((rta) => {
        expect(rta).toBe('observable value');
      });
    }));
  });
});
