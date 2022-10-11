import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
  {
    id: 1,
    text: '首頁',
    url: '/',
  },
  {
    id: 2,
    text: '關於我們',
    url: '/about',
  },
  {
    id: 3,
    text: '購物商城',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
];

export const firebase_products_url = 'https://gold-furniture-thumb-default-rtdb.asia-southeast1.firebasedatabase.app/products';

export const descriptionText = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati facere nulla vitae quidem non earum expedita veniam cum sit quis praesentium cumque odio, ipsam qui eligendi eius quo sequi voluptas. Quia sed exercitationem facere deleniti deserunt id aut, quidem laudantium incidunt sint reiciendis.';
