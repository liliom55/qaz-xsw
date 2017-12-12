import { HumanizePipe } from './humanize.pipe';

describe('HumanizePipe', () => {
  it('should works well', () => {
    const pipe = new HumanizePipe();
    expect(pipe).toBeTruthy();
  });
});
