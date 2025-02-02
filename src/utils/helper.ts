import ChemistProducts from '../lib/data/products/chemistProducts.json';
import DairyProducts from '../lib/data/products/dairyProducts.json';
import SnacksProducts from '../lib/data/products/snacksProducts.json';
import { CartProduct, GetCategoryLinkType, GetDealLinkType, GetProductLinkType, ProductItem } from "./types";

const convertTextToURLSlug = (text: string): string => {
  const clearText = text.replace(/[&\/\\#,+()$~%.":*?<>{}]/g, '').toLowerCase();
  return clearText.replace(/\s/g, "-")
}

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const getCategoryLink = (data: GetCategoryLinkType): string => {
  const subcat = convertTextToURLSlug(data.title);
  return `cat/${subcat}/pid/${data.category_id}/${data.id}`;
}

const getDealLink = (data: GetDealLinkType): string => {
  const dealName = convertTextToURLSlug(data.heading);
  return `deal/${dealName}/pid/${data.id}`;
}

const getProductLink = (data: GetProductLinkType): string => {
  const prodName = convertTextToURLSlug(data.title);
  return `product/${prodName}/pid/${data.id}`;
}

const shuffleItems = (unshuffled: any[] | undefined): any[] => {
  if (unshuffled === undefined) return []
  let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffled;
}

const getProducts = () => {
  const products = [...ChemistProducts, ...DairyProducts, ...SnacksProducts];
  return products;
}

const getProductById = (id: string | undefined) => {
  if (id) {
    const product = getProducts().filter((item) => item.id === id)[0]
    return product || null
  }
}

const getDiscountPercent = (originalPrice: number, discountedPrice: number) => {
  // Check if the original price is greater than zero to avoid division by zero
  if (originalPrice <= 0) {
    return 0; // Return 0 if the original price is not valid
  }
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;
  return Math.round(discountPercentage * 100) / 100;
}

export { convertTextToURLSlug, getCategoryLink, getDealLink, getProductLink, shuffleItems, getProductById, getDiscountPercent };