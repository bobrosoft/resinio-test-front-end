import {TreeReducer, TreeState} from './tree.reducer';
import {TreeActions} from '../actions/tree.actions';

describe('TreeReducer', () => {
  it('should add node', () => {
    const newState = TreeReducer({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [],
        isExpanded: true
      }
    }, TreeActions.addNode('test title', []));
    
    expect(newState).toEqual({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    } as TreeState);
  });

  it('should add child node', () => {
    const newState = TreeReducer({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title', children: [], isExpanded: false},
          {isRoot: false, title: 'test title', children: [], isExpanded: false},
          {isRoot: false, title: 'test title', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    }, TreeActions.addNode('test title 2', [2]));

    expect(newState).toEqual({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title', children: [], isExpanded: false},
          {isRoot: false, title: 'test title', children: [], isExpanded: false},
          {isRoot: false, title: 'test title', children: [
            {isRoot: false, title: 'test title 2', children: [], isExpanded: false},
          ], isExpanded: false}
        ],
        isExpanded: true
      }
    } as TreeState);
  });

  it('should remove node', () => {
    const newState = TreeReducer({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title 1', children: [], isExpanded: false},
          {isRoot: false, title: 'test title 2', children: [], isExpanded: false},
          {isRoot: false, title: 'test title 3', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    }, TreeActions.removeNode([1]));

    expect(newState).toEqual({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title 1', children: [], isExpanded: false},
          {isRoot: false, title: 'test title 3', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    } as TreeState);
  });

  it('should toggle node visibility', () => {
    const newState = TreeReducer({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title 1', children: [], isExpanded: false},
          {isRoot: false, title: 'test title 2', children: [
            {isRoot: false, title: 'test title 2.1', children: [], isExpanded: false},
          ], isExpanded: false},
          {isRoot: false, title: 'test title 3', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    }, TreeActions.toggleNode([1, 0]));

    expect(newState).toEqual({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [
          {isRoot: false, title: 'test title 1', children: [], isExpanded: false},
          {isRoot: false, title: 'test title 2', children: [
            {isRoot: false, title: 'test title 2.1', children: [], isExpanded: true},
          ], isExpanded: false},
          {isRoot: false, title: 'test title 3', children: [], isExpanded: false}
        ],
        isExpanded: true
      }
    } as TreeState);
  });

  it('should provide initial state', () => {
    const newState = TreeReducer(undefined, {type: 'dummy action'});

    expect(newState).toBeDefined();
    expect(newState.rootNode).toBeDefined();
  });

  it('should not change the state', () => {
    const tmp = new TreeActions();
    expect(tmp).toBeDefined();
    
    const newState = TreeReducer({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [],
        isExpanded: true
      }
    }, {type: 'dummy action'});

    expect(newState).toEqual({
      rootNode: {
        isRoot: true,
        title: 'root',
        children: [],
        isExpanded: true
      }
    } as TreeState);
  });
  
});