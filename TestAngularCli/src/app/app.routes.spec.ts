import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';

describe('routes', () => {
  it('should contains a route for /users', () => {
    expect(routes).toContain({ path: 'users', component: UsersComponent });
  });
});
