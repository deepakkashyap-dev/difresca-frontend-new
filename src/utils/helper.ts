import { GetCategoryLinkType, GetDealLinkType, GetProductLinkType } from "./types";
import { jwtDecode } from 'jwt-decode';

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

const getDiscountPercent = (originalPrice: number, discountedPrice: number) => {
  // Check if the original price is greater than zero to avoid division by zero
  if (originalPrice <= 0) {
    return 0; // Return 0 if the original price is not valid
  }
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;
  return Math.round(discountPercentage * 100) / 100;
}

// Utility function to check if token is expired
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const { exp } = jwtDecode<{ exp: number }>(token);
  return Date.now() >= exp * 1000;
};

export { convertTextToURLSlug, getCategoryLink, getDealLink, getProductLink, shuffleItems, getDiscountPercent, isTokenExpired };