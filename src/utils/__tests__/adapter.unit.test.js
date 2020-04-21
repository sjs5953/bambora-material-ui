import { getOptionByFieldName } from '../adapter';

describe('"getOptionByFieldName"', () => {
  it('should return empty object', () => {
    const res = getOptionByFieldName()();
    expect(res).toEqual({});
  });

  it('should return by field', () => {
    const res = getOptionByFieldName({
      foo: { brands: ['Amex'] },
    })('foo');
    expect(res).toEqual({ brands: ['Amex'] });
  });
});
