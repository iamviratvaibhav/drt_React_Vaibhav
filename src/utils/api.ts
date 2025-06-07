import axios from 'axios';

export const fetchSatellites = async (params?: {
  objectTypes?: string[];
  orbitCodes?: string[];
  search?: string;
}) => {
  const query: Record<string, string> = {};

  // Object Types filter
  if (params?.objectTypes?.length) {
    query.objectTypes = params.objectTypes.join(',');
  }

  // Attributes - fixed for now, you can extend
  query.attributes = 'name,noradCatId,orbitCode,objectType,countryCode,launchDate';

  // Build query string
  const queryString = new URLSearchParams(query).toString();

  const response = await axios.get(`https://backend.digantara.dev/v1/satellites?${queryString}`);

  return response.data.data;
};
