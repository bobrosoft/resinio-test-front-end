import {MockStore} from './mock-store.class';

describe('MockStore', () => {
  it('should provide empty state by default', () => {
    const store = new MockStore<any>();
    expect(store.select('test').getValue()).toEqual({});
  });
  
  it('should mock state', () => {
    const store = new MockStore<any>();
    store.mockState('test', 123);
    store.mockState('test', 345);
    expect(store.reducers.get('test').getValue()).toEqual(345);
  });
  
  it('should mock dispatch method', () => {
    const store = new MockStore<any>();
    store.dispatch({});
  });
});