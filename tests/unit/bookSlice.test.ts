import configureStore  from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchBooks, setSearchQuery } from '../../src/redux/store';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('fetchBooks', () => {
  it('dispatches the correct actions on success', async () => {
    const store = mockStore({ book: { searchQuery: '', searchResults: [] } });

    const axiosMock = jest.spyOn(require('axios'), 'get');
    axiosMock.mockResolvedValue({ data: [{ id: 1, title: 'Book 1' }] });

    await store.dispatch(fetchBooks());

    const expectedActions = [
      { type: fetchBooks.pending.type },
      { type: fetchBooks.fulfilled.type, payload: [{ id: 1, title: 'Book 1' }] },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('setSearchQuery', () => {
  it('returns the correct action', () => {
    const action = setSearchQuery('search term');
    expect(action).toEqual({ type: setSearchQuery.type, payload: 'search term' });
  });
});
