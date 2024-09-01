import {Reward} from '../types/reward';
import {RewardCategory} from '../types/reward-category';
import {IMAGES} from './Images';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import React from 'react';

export const TOP_REWARDS_CATEGORY_DATA: Reward[] = [
  {
    coin: 5000,
    description:
      'Kaos Laki-laki berkualitas tinggi dengan desain modern. Nyaman digunakan sehari-hari.',
    id: '1',
    imageUrl: IMAGES.topRewards2,
    name: 'Kaos Pria Modern',
    rewardCategoryId: '',
  },
  {
    coin: 5500,
    description:
      'Kaos perempuan stylish dari GoTrash, cocok untuk gaya kasual. Terbuat dari bahan yang lembut dan nyaman.',
    id: '2',
    imageUrl: IMAGES.topRewards5,
    name: 'Kaos Wanita Kasual',
    rewardCategoryId: '',
  },
  {
    coin: 300,
    description:
      'Kaos unisex dengan desain minimalis, cocok untuk siapa saja. Nyaman dan mudah dipadukan dengan berbagai outfit.',
    id: '3',
    imageUrl: IMAGES.topRewards1,
    name: 'Kaos Unisex Minimalis',
    rewardCategoryId: '',
  },
  {
    coin: 2500,
    description:
      'Notebook eksklusif dari GoTrash dengan desain elegan. Cocok untuk catatan sehari-hari atau sebagai hadiah.',
    id: '4',
    imageUrl: IMAGES.topRewards3,
    name: 'Notebook Elegan',
    rewardCategoryId: '',
  },
  {
    coin: 1500,
    description:
      'Masker stylish dari GoTrash untuk perlindungan sehari-hari. Dilengkapi dengan bahan yang nyaman dan bisa dicuci.',
    id: '5',
    imageUrl: IMAGES.topRewards4,
    name: 'Masker Stylish',
    rewardCategoryId: '',
  },
];

export const REWARDS_CATEGORY_DATA: RewardCategory[] = [
  {
    imageUrl: IMAGES.rewards1,
    name: 'Barang',
    rewards: [
      {
        coin: 1200,
        description:
          'Bantal tidur silikon yang empuk dan nyaman dari GoTrash. Dirancang untuk memberikan kualitas tidur terbaik.',
        id: '6',
        imageUrl: IMAGES.rewards1,
        name: 'Bantal Silikon GoTrash',
        rewardCategoryId: '',
      },
      {
        coin: 1500,
        description:
          'Tumbler mug besar yang praktis untuk dibawa ke mana saja. Menjaga minuman tetap hangat atau dingin lebih lama.',
        id: '7',
        imageUrl: IMAGES.rewards2,
        name: 'Tumbler Mug Besar',
        rewardCategoryId: '',
      },
      {
        coin: 7500,
        description:
          'Jaket eksklusif edisi 2024 dari GoTrash. Cocok untuk aktivitas outdoor dengan gaya yang keren.',
        id: '8',
        imageUrl: IMAGES.rewards3,
        name: 'Jaket GoTrash 2024',
        rewardCategoryId: '',
      },
      {
        coin: 1350,
        description:
          'Tumbler mug kecil yang praktis dan stylish. Ideal untuk minuman favorit Anda saat bepergian.',
        id: '9',
        imageUrl: IMAGES.rewards4,
        name: 'Tumbler Mug Kecil',
        rewardCategoryId: '',
      },
    ],
    icon: <SimpleLineIcon name="present" size={20} />,
  },
  {
    imageUrl: IMAGES.rewards1,
    name: 'Makanan',
    rewards: [
      {
        coin: 650,
        description:
          'Diskon 50% untuk makan di restoran mewah XXX. Nikmati makanan berkualitas dengan harga terjangkau.',
        id: '10',
        imageUrl: IMAGES.rewardsFood1,
        name: 'Diskon 50% Restoran Mewah',
        rewardCategoryId: '',
      },
      {
        coin: 900,
        description:
          'Promo beli 1 gratis 1 buffet di restoran Michelin XXX. Cocok untuk makan malam istimewa bersama keluarga atau teman.',
        id: '11',
        imageUrl: IMAGES.rewardsFood2,
        name: 'Buffet Beli 1 Gratis 1',
        rewardCategoryId: '',
      },
      {
        coin: 850,
        description:
          'Diskon 30% untuk burger terbaik di restoran XXX. Jangan lewatkan kesempatan ini untuk mencicipi burger favorit Anda.',
        id: '12',
        imageUrl: IMAGES.rewardsFood3,
        name: 'Diskon 30% Burger Terbaik',
        rewardCategoryId: '',
      },
      {
        coin: 850,
        description:
          'Nikmati diskon 30% di restoran XXX. Pilihan tepat untuk pecinta kuliner dengan harga bersahabat.',
        id: '13',
        imageUrl: IMAGES.rewardsFood4,
        name: 'Diskon 30% Restoran Favorit',
        rewardCategoryId: '',
      },
    ],
    icon: <SimpleLineIcon name="present" size={20} />,
  },
  {
    imageUrl: IMAGES.rewards1,
    name: 'Liburan',
    rewards: [
      {
        coin: 8000,
        description:
          'Diskon 50% untuk 2 tiket masuk ke Water Park XXX. Seru-seruan bersama keluarga di hari libur.',
        id: '14',
        imageUrl: IMAGES.rewardsVacation1,
        name: 'Diskon 50% Water Park',
        rewardCategoryId: '',
      },
      {
        coin: 8000,
        description:
          'Gratis 2 tiket masuk ke taman rekreasi XXX. Cocok untuk rekreasi santai bersama keluarga.',
        id: '15',
        imageUrl: IMAGES.rewardsVacation2,
        name: 'Gratis Tiket Taman Rekreasi',
        rewardCategoryId: '',
      },
      {
        coin: 8000,
        description:
          'Nikmati diskon 50% tiket masuk ke taman XXX. Ideal untuk menghabiskan waktu bersama teman atau keluarga.',
        id: '16',
        imageUrl: IMAGES.rewardsVacation3,
        name: 'Diskon 50% Tiket Taman',
        rewardCategoryId: '',
      },
      {
        coin: 150000,
        description:
          'Liburan gratis ke Norwegia selama 7 hari 6 malam. Pengalaman tak terlupakan menjelajahi keindahan alam Norwegia.',
        id: '17',
        imageUrl: IMAGES.rewardsVacation4,
        name: 'Liburan Gratis ke Norwegia',
        rewardCategoryId: '',
      },
      {
        coin: 150000,
        description:
          'Jalan-jalan ke Hongkong selama 3 hari 2 malam. Eksplorasi kota modern dengan budaya yang kaya.',
        id: '18',
        imageUrl: IMAGES.rewardsVacation5,
        name: 'Liburan ke Hongkong 3H2M',
        rewardCategoryId: '',
      },
      {
        coin: 5000,
        description:
          'Masuk gratis ke Taman Kota XXX. Tempat yang tepat untuk bersantai dan menikmati suasana alam.',
        id: '19',
        imageUrl: IMAGES.rewardsVacation6,
        name: 'Masuk Gratis Taman Kota',
        rewardCategoryId: '',
      },
    ],
    icon: <SimpleLineIcon name="present" size={20} />,
  },
];

export const REWARDS_DATA: Reward[] = [];
REWARDS_CATEGORY_DATA.forEach(category => {
  REWARDS_DATA.push(...category.rewards);
});

export const REWARDS_CATEGORY_MAP: Record<string, Reward[]> = {};
REWARDS_CATEGORY_DATA.forEach(category => {
  REWARDS_CATEGORY_MAP[category.name] = category.rewards;
});

export const REWARDS_MAP: Record<string, Reward> = {
  ...REWARDS_DATA.reduce((acc, reward) => {
    acc[reward.id!] = reward;
    return acc;
  }, {} as Record<string, Reward>),
};

TOP_REWARDS_CATEGORY_DATA.forEach(reward => {
  REWARDS_MAP[reward.id!] = reward;
});
