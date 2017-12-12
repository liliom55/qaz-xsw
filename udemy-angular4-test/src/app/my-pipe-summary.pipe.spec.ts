import { MyPipeSummaryPipe } from './my-pipe-summary.pipe';

describe('MyPipeSummaryPipe', () => {
  it('create an instance', () => {
    const pipe = new MyPipeSummaryPipe();
    expect(pipe).toBeTruthy();
  });
});
