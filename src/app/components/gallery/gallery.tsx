'use client';
import React, { useEffect, useState } from 'react';
import style from './gallery.module.scss';
import Image from 'next/image';

interface ImageProps {
  image: {
    url: string;
  };
}

interface GalleryItem {
  title: string;
  images: ImageProps[];
}

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/gallery'); // Adjust the API endpoint as needed
        const data = await response.json();
        if (data && data.docs) {
          setGalleryItems(data.docs);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching gallery items:', error);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div className={style.container}>
      {galleryItems.length > 0 ? (
        galleryItems.map((item, index) => (
          <div key={index} className={style.galleryItem}>
            <h2>{item.title}</h2>
            <div className={style.images}>
              {item.images.map((img, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={img.image.url}
                  alt={item.title}
                  width={200}
                  height={200}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Inga bilder uppladdade för tillfället</p>
      )}
    </div>
  );
};

export default Gallery;
