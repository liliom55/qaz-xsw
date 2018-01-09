import { TestBed, inject } from '@angular/core/testing';

import { HomeRoutingService } from './home-routing.service';

describe('HomeRoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeRoutingService]
    });
  });

  it('should service works well', inject([HomeRoutingService], (service: HomeRoutingService) => {
    expect(service).toBeTruthy();
  }));
  it('should NOT to be routingParameters[app] of service undefined',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      expect(service.routingParameters['app']).not.toBeUndefined();
    }));
  it('should be navigate to BodyTypeComponent if current component is EmailFormComponent and anonymous is true',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('EmailFormComponent', { anonymous: true });
      expect(service.current).toBe('BodyTypeComponent');
    }));
  it('should be navigate to PasswordAuthentificationComponent if current component is EmailFormComponent and anonymous is false and client exist and has password',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('EmailFormComponent', { anonymous: false, exists: true, hasPassword: true });
      expect(service.current).toBe('PasswordAuthentificationComponent');
    }));
  it('should be navigate to BodyTypeComponent if current component is EmailFormComponent and anonymous is false and client does not exist',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('EmailFormComponent', { anonymous: false, exists: false });
      expect(service.current).toBe('BodyTypeComponent');
    }));
  it('should be navigate to PasswordRegistrationComponent if current component is EmailFormComponent and anonymous is false and client exist and does not have password',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('EmailFormComponent', { anonymous: false, exists: true, hasPassword: false });
      expect(service.current).toBe('PasswordRegistrationComponent');
    }));
  it('should be navigate to MeasurementHistoryComponent if current component is PasswordAuthentificationComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('PasswordAuthentificationComponent');
      expect(service.current).toBe('MeasurementHistoryComponent');
    }));
  it('should be navigate to MeasurementHistoryComponent if current component is PasswordRegistrationComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('PasswordRegistrationComponent');
      expect(service.current).toBe('MeasurementHistoryComponent');
    }));
  it('should be navigate to BodyTypeComponent if current component is MeasurementHistoryComponent and routingParameters[previousMeasurementChoice] is new',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.routingParameters['previousMeasurementChoice'] = 'new';
      service.next('MeasurementHistoryComponent');
      expect(service.current).toBe('BodyTypeComponent');
    }));
  it('should be navigate to LoaderComponent if current component is MeasurementHistoryComponent and routingParameters[previousMeasurementChoice] is old',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.routingParameters['previousMeasurementChoice'] = 'old';
      service.next('MeasurementHistoryComponent');
      expect(service.current).toBe('LoaderComponent');
    }));
  it('should be navigate to LoaderComponent if current component is MeasurementFormComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('MeasurementFormComponent');
      expect(service.current).toBe('LoaderComponent');
    }));
  it('should be navigate to ScanInstructionComponent if current component is BodyTypeComponent and app is fitRoom',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.routingParameters['app'] = 'fitRoom';
      service.next('BodyTypeComponent');
      expect(service.current).toBe('ScanInstructionComponent');
    }));
  it('should be navigate to MeasurementFormComponent if current component is BodyTypeComponent and app is fitStand',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.routingParameters['app'] = 'fitStand';
      service.next('BodyTypeComponent');
      expect(service.current).toBe('MeasurementFormComponent');
    }));
  it('should be navigate to ScanComponent if current component is ScanInstructionComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('ScanInstructionComponent');
      expect(service.current).toBe('ScanComponent');
    }));
    it('should be navigate to LoaderComponent if current component is ScanComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.next('ScanComponent');
      expect(service.current).toBe('LoaderComponent');
    }));
    it('should be navigate to LoaderComponent if current component is ScanComponent',
    inject([HomeRoutingService], (service: HomeRoutingService) => {
      service.back('ScanInstructionComponent');
      expect(service.current).toBe('ScanInstructionComponent');
    }));    
});
