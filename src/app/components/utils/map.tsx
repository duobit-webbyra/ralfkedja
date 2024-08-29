'use client';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');
      const position = { lat: 59.3648070446075, lng: 16.515614441733714 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: 'MY_NEXTJS_MAPID',
      };

      new Map(mapRef.current as HTMLDivElement, mapOptions);
    };

    initMap();
  }, []);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
}
