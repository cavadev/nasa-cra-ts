import axios from "axios";
import { Collection, Manifest, MetadataLocation, MetadataDetails, SearchFilters } from "../interfaces";

const http = axios.create({
  baseURL: 'https://images-api.nasa.gov',
  headers: {
    'Content-type': 'application/json'
  }
});

const getManifest = (id: string) => {
  return http.get<Manifest>(`/asset/${id}`);
};

const getMetadataDetails = (locationUrl: string) => {
  return http.get<MetadataDetails>(`${locationUrl}`);
};

const getMetadataLocation = (id: string) => {
  return http.get<MetadataLocation>(`/metadata/${id}`);
};

const search = (q: string, filters: SearchFilters) => {
  let parameters = 'q=' + q + '&media_type=';
  if (filters.images) parameters += 'image,';
  if (filters.audio) parameters += 'audio,';
  return http.get<Collection>(`/search?${parameters}`);
};

const NasaService = {
  getManifest,
  getMetadataDetails,
  getMetadataLocation,
  search,
};

export default NasaService;