import deburr from 'lodash.deburr';
import { useEffect, useState } from 'react';

function useLatLong(address) {
  const [latLong, setLatLong] = useState({ lat: null, long: null });

  useEffect(() => {
    const getLatLong = async () => {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${deburr(address)}&type=street`
      );
      const decoded = await res.json();
      const [long, lat] = await decoded.features[0].geometry.coordinates;
      setLatLong({ lat, long });
    };
    getLatLong();
  }, []);

  return { latLong };
}

export const RE = async (address) => {
  const res = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${deburr(address)}&type=street`
  );
  const decoded = await res.json();
  const [long, lat] = await decoded.features[0].geometry.coordinates;

  return { lat, long };
};

export default useLatLong;
