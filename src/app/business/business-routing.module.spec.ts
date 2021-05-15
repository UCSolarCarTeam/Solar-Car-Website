import { BusinessRoutingModule } from './business-routing.module';

describe('BusinessRoutingModule', () => {
  let appRoutingModule: BusinessRoutingModule;
  beforeEach(() => {
    appRoutingModule = new BusinessRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
