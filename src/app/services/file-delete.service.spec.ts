import { TestBed } from '@angular/core/testing';

import { FileDeleteService } from './file-delete.service';

describe('FileDeleteService', () => {
  let service: FileDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
