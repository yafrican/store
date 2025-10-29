// utils/stockUtils.ts
export const getStockStatus = (product: any) => {
  // If inStock is explicitly false, show out of stock
  if (product.inStock === false) return 'out_of_stock'
  
  // If inStock is true or undefined, check stock quantity
  if (product.stock > 0) return 'in_stock'
  
  return 'out_of_stock'
}

export const getStockDisplayText = (product: any) => {
  const status = getStockStatus(product)
  return status === 'in_stock' ? 'In Stock' : 'Out of Stock'
}