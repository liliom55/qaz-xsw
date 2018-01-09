import { ProductSizeDisplayPipe } from './product-size-display.pipe';

describe('ProductSizeDisplayPipe', () => {
  it('should works well', () => {
    const pipe = new ProductSizeDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
