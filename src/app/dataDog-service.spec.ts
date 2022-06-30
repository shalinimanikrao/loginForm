import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserDataSessionStorageProvider } from '../../models/user-data-provider/UserDataSessionStorageProvider';
import { LoggerService } from './logger-service.service';
import { UserDataService } from './userDataservice.service';

describe('LoggerServiceService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService,CookieService, 
      { provide: 'IUserDataProvider', useClass: UserDataSessionStorageProvider }]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 });
 