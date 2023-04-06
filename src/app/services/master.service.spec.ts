import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let mockValueService: jasmine.SpyObj<ValueService>;
  beforeEach(() => {
    mockValueService = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [{ provide: ValueService, useValue: mockValueService }],
    });
    masterService = TestBed.inject(MasterService);
  });

  it('should be create', function () {
    expect(masterService).toBeTruthy();
  });

  describe('MasterService getValue', () => {
    it('should getValue from ValueService', function () {
      mockValueService.getValue.and.returnValue('second');
      expect(masterService.getValue()).toBe('second');
      expect(mockValueService.getValue).toHaveBeenCalled();
      expect(mockValueService.getValue).toHaveBeenCalledTimes(1);
    });
  });
});
