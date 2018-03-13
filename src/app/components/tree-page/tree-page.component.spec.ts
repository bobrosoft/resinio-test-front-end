import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {Store} from '@ngrx/store';
import { TreePageComponent } from './tree-page.component';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TreeNode} from '../../models/tree-node.model';
import {TreePath} from '../../models/tree-path.model';
import {TreeAddItemSubmitEvent} from '../../models/tree-add-item-submit-event.model';
import {AppState} from '../../reducers/index';
import {By} from '@angular/platform-browser';
import {MockStore} from '../../shared/mock-store.class';
import {TreeActions} from '../../actions/tree.actions';

const mockState = {
  tree: {
    rootNode: {
      title: 'root',
      isRoot: true,
      isExpanded: true,
      children: []
    }
  }
} as AppState;

describe('TreePageComponent', () => {
  let component: TreePageComponent;
  let store: Store<AppState>;
  let fixture: ComponentFixture<TreePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreePageComponent, MockTreeNodeComponent ],
      providers: [{provide: Store, useClass: MockStore}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([Store], (_store: Store<AppState>) => {
    store = _store;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch proper action on node toggle click', () => {
    const spy = spyOn(store, 'dispatch');
    const node = fixture.debugElement.query(By.css('tree-node'));
    expect(node).toBeDefined();

    node.componentInstance.toggleClick.emit([0]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(TreeActions.toggleNode([0]));
  });

  it('should dispatch proper action on node delete click', () => {
    const spy = spyOn(store, 'dispatch');
    const node = fixture.debugElement.query(By.css('tree-node'));
    expect(node).toBeDefined();

    node.componentInstance.deleteClick.emit([0]);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(TreeActions.removeNode([0]));
  });

  it('should dispatch proper action on node add item submit click', () => {
    const spy = spyOn(store, 'dispatch');
    const node = fixture.debugElement.query(By.css('tree-node'));
    expect(node).toBeDefined();

    node.componentInstance.addItemSubmit.emit({title: 'test', path: [0]});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(TreeActions.addNode('test', [0]));
  });
});

@Component({
  selector: 'tree-node',
  template: ''
})
class MockTreeNodeComponent {
  @Input() data: TreeNode;
  @Output() toggleClick = new EventEmitter<TreePath>();
  @Output() deleteClick = new EventEmitter<TreePath>();
  @Output() addItemSubmit = new EventEmitter<TreeAddItemSubmitEvent>();
}
