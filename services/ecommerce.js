import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import { sortProducts, paginateProducts } from '../utils/helpers.js';

const BASE_URL = 'http://20.244.56.144/test';
const COMPANIES = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
// const TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDc2MTExLCJpYXQiOjE3MTcwNzU4MTEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYzODFhM2U0LWMwOGYtNDljMi1iNTZlLTUxMzQwNmJmYmQ2YyIsInN1YiI6InMuYS55dXZhcmFqMjZAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJmMzgxYTNlNC1jMDhmLTQ5YzItYjU2ZS01MTM0MDZiZmJkNmMiLCJjbGllbnRTZWNyZXQiOiJlQlJlV05Ua3JlTEpHTEZ2Iiwib3duZXJOYW1lIjoiUyBBIFlVVkFSQUoiLCJvd25lckVtYWlsIjoicy5hLnl1dmFyYWoyNkBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNWRnIn0.k_fCYObt_YWaXQwsmQ85NrW52iBdnY-h5FXCvULuSsU';
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDgxNjkzLCJpYXQiOjE3MTcwODEzOTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYzODFhM2U0LWMwOGYtNDljMi1iNTZlLTUxMzQwNmJmYmQ2YyIsInN1YiI6InMuYS55dXZhcmFqMjZAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJmMzgxYTNlNC1jMDhmLTQ5YzItYjU2ZS01MTM0MDZiZmJkNmMiLCJjbGllbnRTZWNyZXQiOiJlQlJlV05Ua3JlTEpHTEZ2Iiwib3duZXJOYW1lIjoiUyBBIFlVVkFSQUoiLCJvd25lckVtYWlsIjoicy5hLnl1dmFyYWoyNkBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMWJkMWEwNWRnIn0.nbsMJe9Ukz5QCN4DEDn_8gwOx2OV01H7SevZU_jIDBg"
const fetchProducts = async (company, category, minPrice, maxPrice, top) => {
  const url = `${BASE_URL}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`
    }
  });
  const data = await response.json();
  return data.map(product => ({
    ...product,
    id: uuidv4(),
    company
  }));
};

const getProducts = async (category, n, page, sort, order, minPrice, maxPrice) => {
  let allProducts = [];

  for (const company of COMPANIES) {
    const products = await fetchProducts(company, category, minPrice, maxPrice, n);
    allProducts = [...allProducts, ...products];
  }

  const sortedProducts = sortProducts(allProducts, sort, order);
  const paginatedProducts = paginateProducts(sortedProducts, n, page);

  return paginatedProducts;
};

const getProductById = async (category, productId) => {
  for (const company of COMPANIES) {
    const response = await fetch(`${BASE_URL}/companies/${company}/categories/${category}/products?top=100&minPrice=0&maxPrice=1000000`, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`
      }
    });
    const data = await response.json();
    const product = data.find(product => product.id === productId);
    if (product) {
      return product;
    }
  }
  return null;
};

export { getProducts, getProductById };
