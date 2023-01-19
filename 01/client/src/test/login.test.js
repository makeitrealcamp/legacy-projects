import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import history from '../utils/history';
import axios from '../utils/axios.js';
import createStore from '../store';
import { TOKEN } from '../actions/constants';
import Login from '../pages/LoginPage';
import { MemoryRouter } from 'react-router';

jest.mock('../utils/axios.js');

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

describe('Login tests', () => {
  test('allows user to login', async () => {
    // preparación
    axios.post.mockResolvedValueOnce({
      data: {
        token: 'jdjdjdjd',
        userData: {
          email: 'estudianteTest@example.com',
          fistName: 'Pedro',
          lastName: 'Perez',
        },
      },
    });

    history.push('/login');

    // ejecución
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    // validaciones
    await waitFor(() => screen.getByTestId('login-title'));
    fireEvent.change(screen.getByTestId('email'), {
      target: { name: 'email', value: 'estudianteTest@example.com' },
    });
    fireEvent.change(screen.getByTestId('password'), {
      target: { name: 'password', value: 'example' },
    });

    fireEvent.blur(screen.getByTestId('password'));

    const spy = jest.spyOn(history, 'push');
    fireEvent.click(screen.getByTestId('login-send'));

    await waitFor(() => expect(spy).toHaveBeenCalledWith('/home'));
  });
});
