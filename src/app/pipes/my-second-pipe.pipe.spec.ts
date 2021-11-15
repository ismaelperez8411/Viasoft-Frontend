import { MySecondPipePipe } from './my-second-pipe.pipe';

describe('MySecondPipePipe', () => {
  it('create an instance', () => {
    const pipe = new MySecondPipePipe();
    expect(pipe).toBeTruthy();
  });
});
