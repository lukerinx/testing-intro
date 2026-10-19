const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  // --- Точное совпадение ---
  test("запрос 'Наушники' возвращает ID [1]", () => {
    const result = searchProducts(products, 'Наушники');
    expect(result.map(item => item.id)).toEqual([1]);
  });

  test("запрос 'Чистый код' возвращает ID [6]", () => {
    const result = searchProducts(products, 'Чистый код');
    expect(result.map(item => item.id)).toEqual([6]);
  });

  test("запрос 'Настольная лампа' возвращает ID [4]", () => {
    const result = searchProducts(products, 'Настольная лампа');
    expect(result.map(item => item.id)).toEqual([4]);
  });

  // --- Регистр не влияет на поиск ---
  test("запрос 'javascript' возвращает ID [3]", () => {
    const result = searchProducts(products, 'javascript');
    expect(result.map(item => item.id)).toEqual([3]);
  });

  test("запрос 'ЧЕХОЛ' возвращает ID [5]", () => {
    const result = searchProducts(products, 'ЧЕХОЛ');
    expect(result.map(item => item.id)).toEqual([5]);
  });

  test("запрос 'наушники' возвращает ID [1]", () => {
    const result = searchProducts(products, 'наушники');
    expect(result.map(item => item.id)).toEqual([1]);
  });

  // --- Пустой запрос ---
  test("пустой запрос '' возвращает все товары", () => {
    const result = searchProducts(products, '');
    expect(result.map(item => item.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("запрос из пробелов '   ' возвращает все товары", () => {
    const result = searchProducts(products, '   ');
    expect(result.map(item => item.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("запрос со спецсимволами '\\t\\n' возвращает все товары", () => {
    const result = searchProducts(products, '\t\n');
    expect(result.map(item => item.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});