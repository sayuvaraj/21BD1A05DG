const sortProducts = (products, sort, order) => {
    if (!sort) return products;
  
    return products.sort((a, b) => {
      if (order === 'asc') {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });
  };
  
  const paginateProducts = (products, n, page) => {
    const startIndex = (page - 1) * n;
    return products.slice(startIndex, startIndex + n);
  };
  
  export { sortProducts, paginateProducts };
  