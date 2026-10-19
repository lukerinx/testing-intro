const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  // Вспомогательная функция для генерации массива с нужными товарами
  const getProductsByIds = (ids) => {
    return ids.map(id => products.find(p => p.id === id));
  };

  // --- По возрастанию ---
  test("все products, направление 'asc' возвращает ID [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map(item => item.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("все products, направление не передано возвращает ID [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products);
    expect(result.map(item => item.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары с ID [1, 3, 4], направление 'asc' возвращает ID [3, 4, 1]", () => {
    const customProducts = getProductsByIds([1, 3, 4]);
    const result = sortProductsByPrice(customProducts, 'asc');
    expect(result.map(item => item.id)).toEqual([3, 4, 1]);
  });

  // --- По убыванию ---
  test("все products, направление 'desc' возвращает ID [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map(item => item.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары с ID [3, 1, 4], направление 'desc' возвращает ID [1, 4, 3]", () => {
    const customProducts = getProductsByIds([3, 1, 4]);
    const result = sortProductsByPrice(customProducts, 'desc');
    expect(result.map(item => item.id)).toEqual([1, 4, 3]);
  });

  test("товары с ID [5, 2, 6], направление 'desc' возвращает ID [2, 5, 6]", () => {
    const customProducts = getProductsByIds([5, 2, 6]);
    const result = sortProductsByPrice(customProducts, 'desc');
    expect(result.map(item => item.id)).toEqual([2, 5, 6]);
  });

  // --- Исходный массив не меняется ---
  test("товары с ID [1, 3, 4], вызов с 'asc' не меняет исходный массив", () => {
    const customProducts = getProductsByIds([1, 3, 4]);
    const originalCopy = [...customProducts];
    sortProductsByPrice(customProducts, 'asc');
    expect(customProducts).toEqual(originalCopy);
  });

  test("товары с ID [1, 3, 4], вызов с 'desc' не меняет исходный массив", () => {
    const customProducts = getProductsByIds([1, 3, 4]);
    const originalCopy = [...customProducts];
    sortProductsByPrice(customProducts, 'desc');
    expect(customProducts).toEqual(originalCopy);
  });

  test("все products, направление не передано не меняет исходный массив", () => {
    const originalCopy = [...products];
    sortProductsByPrice(products);
    expect(products).toEqual(originalCopy);
  });
});