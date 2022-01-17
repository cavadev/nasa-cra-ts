import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import { AxiosResponse } from 'axios';
import NasaService from '../services/NasaService';
import { fakeCollection } from '../mocks';

const axiosFakeResponse: AxiosResponse = {
  data: {
    collection: fakeCollection
  },
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

describe('Search component', () => {

  test('renders Nasa Image and Audio Library text', () => {
    render(<Search />);
    const textElement = screen.getByText(/Nasa Image and Audio Library/i);
    expect(textElement).toBeInTheDocument();
  });

  test('call the search function with the search string', async () => {
    const searchString = "moon";
    const mock = jest.spyOn(NasaService, "search").mockResolvedValue(axiosFakeResponse);
    render(<Search />);

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: searchString }});

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith( searchString, { "audio": true, "images": true} );
  });

})
