import { PortalRoutingModule } from './portal-routing.module';

describe('PortalRoutingModule', () => {
  let appRoutingModule: PortalRoutingModule;
  beforeEach(() => {
    appRoutingModule = new PortalRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
