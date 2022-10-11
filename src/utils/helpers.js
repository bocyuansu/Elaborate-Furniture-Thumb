export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === 'colors') {
    // flat() 函數以遞迴方式將特定深度的子陣列重新串接成為一新的陣列
    unique = unique.flat();
  }
  // Set 物件可儲存任何類型的唯一值
  return ['all', ...new Set(unique)];
};


