const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number) => {
    // Check if the original price is greater than zero to avoid division by zero
    if (originalPrice <= 0) {
        return 0; // Return 0 if the original price is not valid
    }

    // Calculate the discount amount
    const discountAmount = originalPrice - discountedPrice;

    // Calculate the discount percentage
    const discountPercentage = (discountAmount / originalPrice) * 100;

    // Return the discount percentage rounded to two decimal places
    return Math.round(discountPercentage * 100) / 100;
}
export default calculateDiscountPercentage;
