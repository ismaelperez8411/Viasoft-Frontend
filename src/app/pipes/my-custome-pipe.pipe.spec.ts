import { MyCustomePipePipe } from './my-custome-pipe.pipe';

describe('MyCustomePipePipe', () => {
  it('create an instance', () => {
    const pipe = new MyCustomePipePipe();
    expect(pipe).toBeTruthy();
  });
});
