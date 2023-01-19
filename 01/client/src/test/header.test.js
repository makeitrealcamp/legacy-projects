import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Router } from 'react-router';
import Header from '../components/Header';
import history from '../utils/history';
import createStore from '../store';

jest.mock('../utils/axios');
window.scrollTo = jest.fn();

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

afterEach(cleanup);


describe('Header', () => {
    test('Renders the header', () => {
        store = createStore();
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    })
    test('Sign In and Register button show if the user is not logged in', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )
        expect(localStorage.getItem("token")).toBeFalsy()
        expect(screen.queryByTestId('sign-in-button')).toBeInTheDocument();
        expect(screen.queryByTestId('register-button')).toBeInTheDocument();
    })
    test('Sign in and Register button dont show if the user is logged in', async () => {
        localStorage.setItem("token", "fake token")
        store.dispatch({ type: "GET_USER_DATA", payload: {token: localStorage.getItem('token')}})
        await history.push('/home');
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )
        expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
        expect(screen.queryByTestId('register-button')).not.toBeInTheDocument();
    })
    test('Clicking Sign In button redirects to login page', async () => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        )

        const spy = jest.spyOn(history, 'push')
        // await waitFor(() => screen.getByTestId(/sign-in-button/i));
        fireEvent.click(screen.getByTestId(/sign-in-button/i))
        await waitFor(() => expect(spy).toHaveBeenCalledWith("/login"))
        
    })
    test('Clicking Register button redirects to Register page', async () => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        )

        const spy = jest.spyOn(history, 'push')
        // await waitFor(() => screen.getByTestId(/register-button/i));
        fireEvent.click(screen.getByTestId(/register-button/i))
        await waitFor(() => expect(spy).toHaveBeenCalledWith("/register"))
        
    })
    test('Sign out button signs out', async () => {
        localStorage.setItem("token", "fake token")
        store.dispatch({ type: "GET_USER_DATA", payload: {token: localStorage.getItem('token')}})
        await history.push('/home');
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        )
        fireEvent.click(screen.getByTestId(/sign-out-button/i));
        await waitFor(() => expect(localStorage.getItem("token")).toBeNull());
    })
    test('Logo image redirects to homepage if the user is logged in', async () => {
        localStorage.setItem("token", "fake token")
        store.dispatch({ type: "GET_USER_DATA", payload: {token: localStorage.getItem('token')}})
        await history.push('/home');
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        )
        const spy = jest.spyOn(history, 'push')
        fireEvent.click(screen.getByTestId(/logo-image/i))
        await waitFor(() => expect(spy).toHaveBeenCalledWith("/home"))
    })
    test('Logo image redirects to landing page if the user is not logged in', async () => {
        render(
            <Provider store={store}>
                <Router history={history}>
                    <Header />
                </Router>
            </Provider>
        )
        const spy = jest.spyOn(history, 'push')
        fireEvent.click(screen.getByTestId(/logo-image/i))
        await waitFor(() => expect(spy).toHaveBeenCalledWith("/"))  
    })
});
