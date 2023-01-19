import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import history from '../utils/history';
import axios from '../utils/axios.js';
import createStore from '../store';
import { MemoryRouter } from 'react-router';
import TutorDetailsPage from '../pages/TutorDetailsPage';

jest.mock('../utils/axios.js');

let store;
beforeEach(() => {
  localStorage.clear();
  store = createStore();
});

describe('renders the info from backend', () => {
  test('Loads tutor details', async () => {
    const props = {
      location: {
        state: 'saasdasdasdas',
      },
    };

    axios.get.mockResolvedValueOnce({
      data: {
        name: 'Axel Leuschke',
        profile_photo: 'https://cdn.fakercloud.com/avatars/samgrover_128.jpg',
        description: 'Description test',
        profession: 'National Operations Representative',
        focus: 'Math',
        rating: 5,
        reviews: [
          {
            _id: '12',
            comment: 'test review',
            rating: 2,
            student_id: {
              name: 'Maribel Spencer',
            },
          },
          {
            _id: '123',
            comment: 'test review',
            rating: 2,
            student_id: {
              name: 'Maribel Spencer',
            },
          },
          {
            _id: '1234',
            comment: 'test review',
            rating: 2,
            student_id: {
              name: 'Maribel Spencer',
            },
          },
        ],
      },
    });

    history.push('/tutor');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TutorDetailsPage location={props.location} />
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(() => screen.getByText('About me'));

    const name = screen.getByText('Axel Leuschke');
    expect(name).toBeInTheDocument();

    const profession = screen.getByText('National Operations Representative');
    expect(profession).toBeInTheDocument();

    const area = screen.getByText('Area: Math');
    expect(area).toBeInTheDocument();

    const description = screen.getByText('Description test');
    expect(description).toBeInTheDocument();

    const image = screen.getByAltText('tutor profile');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn.fakercloud.com/avatars/samgrover_128.jpg',
    );

    const ratingStars = screen.queryAllByTitle('tutor-rating-star');
    expect(ratingStars).toHaveLength(5);

    const studentName = screen.getAllByText('Maribel Spencer');
    expect(studentName).toHaveLength(3);

    const reviewStars = screen.queryAllByTitle('review-rating-star');
    expect(reviewStars).toHaveLength(6);

    const reviewComment = screen.getAllByText('test review');
    expect(reviewComment).toHaveLength(3);
  });

  test('redirects to payment page', async () => {
    const props = {
      location: {
        state: 'saasdasdasdas',
      },
    };

    history.push('/tutor');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <TutorDetailsPage location={props.location} />
        </MemoryRouter>
      </Provider>,
    );
    const spy = jest.spyOn(history, 'push');
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(spy).toHaveBeenCalledWith('/pay'));
  });
});
