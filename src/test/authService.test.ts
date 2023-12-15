import { AuthService } from '../services/authService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should not be authorized initially', async () => {
    const authorized = await authService.isAuthorized();
    expect(authorized).toBe(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
