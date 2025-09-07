import axios from 'axios';

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface NominatimResponse{
    lat: string,
    lon: string,
    display_name: string;
}

export async function getCoordinates(address: Address): Promise<{ lat: number; lon: number } | null> {
  try {
    const { street, city, state, country, postalCode } = address;
    const fullAddress = `${street}, ${city}, ${state}, ${postalCode}, ${country}`;

    const response = await axios.get<NominatimResponse[]>('https://nominatim.openstreetmap.org/search', {
      params: {
        q: fullAddress,
        format: 'json',
        limit: 1,
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      console.log('Coordinates:', lat, lon);
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    }

    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}