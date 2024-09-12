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
      const position = { lat: 59.362857095991195, lng: 16.514192397638258 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: 'MY_NEXTJS_MAPID',
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
      const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
      const marker = new AdvancedMarkerElement({
        //const marker = new google.maps.Marker({
        map,
        position: position,
      });
    };

    initMap();
  }, []);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
}
