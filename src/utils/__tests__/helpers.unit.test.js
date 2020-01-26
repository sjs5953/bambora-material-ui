import { invoke } from '../helpers';

describe('Helpers', () => {
  describe('invoke', () => {
    it('should call method', () => {
      const foo = jest.fn();
      invoke({ foo }, 'foo', 1);
      expect(foo).toHaveBeenCalledWith(1);
    });

    it('should call nested fn', () => {
      const bar = jest.fn();
      invoke({ foo: { bar } }, 'foo.bar', 1);
      expect(bar).toHaveBeenCalledWith(1);
    });

    it('should not call on out-of-place match', () => {
      const bar = jest.fn();
      invoke({ bar, foo: { quuz: bar } }, 'foo.bar', 1);
      expect(bar).not.toHaveBeenCalledWith(1);
    });
  });
});
