import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import history from '../utils/history';
import axios from '../utils/axios.js';
import createStore from '../store';
import Register from '../pages/Register';
import { MemoryRouter } from 'react-router';

jest.mock('../utils/axios.js');

let store;
beforeEach(() => {
  window.scrollTo = jest.fn();
  localStorage.clear();
  store = createStore();
  axios.get.mockResolvedValueOnce({
    data: {
      categories: [
        { _id: 1, subject: 'Math' },
        { _id: 2, subject: 'Chemistry' },
        { _id: 3, subject: 'Biology' },
        { _id: 4, subject: 'Physics' },
        { _id: 5, subject: 'Development' },
        { _id: 6, subject: 'Psychology' },
      ],
    },
  });
});

describe('test register page', () => {
  test('loads categories data', async () => {
    // preparación

    history.push('/register');

    // ejecución
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );

    // validaciones
    await waitFor(() => screen.getByText('Are you a student or a tutor?'));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'tutor' },
    });

    const initialText = screen.getByText('Choose your area of expertise');
    expect(initialText).toBeInTheDocument();

    const category = screen.getByText('Biology');
    expect(category).toBeInTheDocument();
  });

  test('Allows student registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        type: 'student',
        inputs: {
          name: 'test student',
          email: 'estudianteTest@example.com',
          password: 'example',
        },
      },
    });
    history.push('/register');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText('Are you a student or a tutor?'));

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { name: 'name', value: 'test student' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Name'));

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { name: 'email', value: 'studentTest@example.com' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Email'));

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { name: 'password', value: 'example' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Password'));

    const spy = jest.spyOn(history, 'push');
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(spy).toHaveBeenCalledWith('/home'));
    fireEvent.click(screen.getByText('OK'));
  });

  test('Allows tutor registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        type: 'tutor',
        inputs: {
          name: 'test student',
          email: 'tutorTest@example.com',
          password: 'example',
          profession: 'Web Developer',
          focus: 'Development',
        },
      },
    });
    // history.push('/register');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText('Are you a student or a tutor?'));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'tutor' },
    });

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'tutor' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Name'));

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'tutorTest@example.com' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Email'));

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '1234567' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Password'));

    fireEvent.change(screen.getByPlaceholderText('Profession'), {
      target: { value: 'Web Developer' },
    });
    fireEvent.blur(screen.getByPlaceholderText('Profession'));

    fireEvent.change(screen.getByPlaceholderText('Focus'), {
      target: { value: 'Math' },
    });

    fireEvent.blur(screen.getByPlaceholderText('Focus'));

    const spy = jest.spyOn(history, 'push');

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(spy).toHaveBeenCalledWith('/home'));
    fireEvent.click(screen.getByText('OK'));
  });
});
