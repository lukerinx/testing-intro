const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  // --- Товар существует ---
  test("ID 1 возвращает объект products[0]", () => {
    expect(getProductById(products, 1)).toEqual(products[0]);
  });

  test("ID 4 возвращает объект products[3]", () => {
    expect(getProductById(products, 4)).toEqual(products[3]);
  });

  test("ID 6 возвращает объект products[5]", () => {
    expect(getProductById(products, 6)).toEqual(products[5]);
  });

  // --- Числовой ID отсутствует ---
  test("ID 0 возвращает null", () => {
    expect(getProductById(products, 0)).toBeNull();
  });

  test("ID 999 возвращает null", () => {
    expect(getProductById(products, 999)).toBeNull();
  });

  test("ID -1 возвращает null", () => {
    expect(getProductById(products, -1)).toBeNull();
  });

  // --- ID неверного типа ---
  test("строковый ID '1' возвращает null", () => {
    expect(getProductById(products, '1')).toBeNull();
  });

  test("ID undefined возвращает null", () => {
    expect(getProductById(products, undefined)).toBeNull();
  });

  test("ID NaN возвращает null", () => {
    expect(getProductById(products, NaN)).toBeNull();
  });
});