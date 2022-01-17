import { render, screen } from '@testing-library/react';

import { AxiosResponse } from 'axios';

import Asset from './Asset';
import NasaService from '../services/NasaService';
import { fakeMetadataLocation, fakeMetadataDetails, fakeManifest } from '../mocks';

const fakeMetadataLocationResponse: AxiosResponse = {
  data: fakeMetadataLocation,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

const fakeMetadataDetailsResponse: AxiosResponse = {
  data: fakeMetadataDetails,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

const fakeManifestResponse: AxiosResponse = {
  data: fakeManifest,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

describe('Asset component', () => {

  test('renders the CircularProgress component', () => {
    render(<Asset />);
    const textElement = screen.getByRole('progressbar');
    expect(textElement).toBeInTheDocument();
  });
  
  /*
  test('get the asset data', async () => {
    const mockGetMetadataLocation = jest.spyOn(NasaService, 'getMetadataLocation').mockResolvedValue(fakeMetadataLocationResponse);
    const mockGetMetadataDetails = jest.spyOn(NasaService, 'getMetadataDetails').mockResolvedValue(fakeMetadataDetailsResponse);
    const mockGetManifestResponse = jest.spyOn(NasaService, 'getManifest').mockResolvedValue(fakeManifestResponse);

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useParams: () => ({
        id: '1'
      })
    }));

    render(<Asset />);

    const textElement = screen.getByText(/Nearside of the Moon/i);
    expect(textElement).toBeInTheDocument();

    expect(mockGetMetadataLocation).toHaveBeenCalledTimes(1);
    expect(mockGetMetadataDetails).toHaveBeenCalledTimes(1);
    expect(mockGetManifestResponse).toHaveBeenCalledTimes(1);
    expect(mockGetManifestResponse).toHaveBeenCalledWith(1);
  
  });
  */

})
