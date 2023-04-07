import { TestBed } from '@angular/core/testing';
import {MapsService} from "./map.service";

describe('MapService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MapsService
      ]
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should create', () => {
    expect(mapService).toBeTruthy();
  });

  describe('getCurrentPosition', () => {
    it('should save to center', function () {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFN)=>{
        const mockGeolocation: GeolocationPosition = {
            coords: {
              accuracy: 0,
              latitude: 1000,
              longitude: 19999,
              altitude: 1200,
              altitudeAccuracy: 0,
              heading: 6,
              speed: 1
            },
            timestamp: 2121212
        }
        successFN(mockGeolocation);
      });
      mapService.getCurrentPosition();
      expect(mapService.center).toEqual({
        lat: 1000, lng: 19999
      });
    });
  });

});
