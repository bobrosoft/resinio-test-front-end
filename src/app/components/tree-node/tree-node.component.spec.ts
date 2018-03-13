import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeComponent } from './tree-node.component';
import {By} from '@angular/platform-browser';
import {TreePath} from '../../models/tree-path.model';
import {TreeAddItemSubmitEvent} from '../../models/tree-add-item-submit-event.model';
import {ReactiveFormsModule} from '@angular/forms';
import {noUndefined} from '@angular/compiler/src/util';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ TreeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    component.index = 0;
    component.data = {
      title: 'test',
      isRoot: false,
      children: [],
      isExpanded: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title and children', () => {
    component.data = {
      title: 'test',
      isRoot: false,
      children: [
        {title: 'test 2', isRoot: false, children: [], isExpanded: false},
        {title: 'test 2', isRoot: false, children: [], isExpanded: false}
      ],
      isExpanded: false
    };
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.title .text')).nativeElement.textContent).toBe('test');
    expect(fixture.debugElement.queryAll(By.css('tree-node')).length).toBe(2);
  });

  it('should hide title for the root node', () => {
    component.data = {
      title: 'test',
      isRoot: true,
      children: [],
      isExpanded: false
    };
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.title .text')).length).toBe(0);
  });

  it('should expand if node isExpanded', () => {
    component.data = {
      title: 'test',
      isRoot: false,
      children: [{title: 'test 2', isRoot: false, children: [], isExpanded: false}],
      isExpanded: false
    };
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.title.expanded')).length).toBe(0);
    expect(fixture.debugElement.queryAll(By.css('.children.expanded')).length).toBe(0);

    component.data = {...component.data, isExpanded: true};
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.title.expanded')).length).toBe(1);
    expect(fixture.debugElement.queryAll(By.css('.children.expanded')).length).toBe(1);
  });

  it('should emit proper event on title click', () => {
    let event: TreePath;
    component.toggleClick.subscribe(e => event = e);

    fixture.debugElement.query(By.css('.title')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual([0]);
  });

  it('should emit proper event on child title click', () => {
    component.data = {
      title: 'test 1',
      isRoot: false,
      children: [
        {title: 'test 1.1', isRoot: false, children: [], isExpanded: false},
        {title: 'test 1.2', isRoot: false, children: [], isExpanded: false},
        {title: 'test 1.3', isRoot: false, children: [], isExpanded: false}
      ],
      isExpanded: true // TRUE here
    };
    fixture.detectChanges();
    
    let event: TreePath;
    component.toggleClick.subscribe(e => event = e);

    fixture.debugElement.queryAll(By.css('tree-node .title'))[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual([0, 2]);
  });

  it('should emit proper event on delete button click', () => {
    let event: TreePath;
    component.deleteClick.subscribe(e => event = e);

    fixture.debugElement.query(By.css('.js-delete-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual([0]);
  });

  it('should emit proper event on child delete button click', () => {
    component.data = {
      title: 'test 1',
      isRoot: false,
      children: [
        {title: 'test 1.1', isRoot: false, children: [], isExpanded: false},
        {title: 'test 1.2', isRoot: false, children: [], isExpanded: false},
        {title: 'test 1.3', isRoot: false, children: [], isExpanded: false}
      ],
      isExpanded: true // TRUE here
    };
    fixture.detectChanges();

    let event: TreePath;
    component.deleteClick.subscribe(e => event = e);

    fixture.debugElement.queryAll(By.css('tree-node .js-delete-btn'))[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual([0, 2]);
  });

  it('should emit proper event on adding new item', () => {
    component.index = undefined;
    component.data = {
      title: 'test 1',
      isRoot: true,
      children: [],
      isExpanded: true // TRUE here
    };
    fixture.detectChanges();
    
    let event: TreeAddItemSubmitEvent;
    component.addItemSubmit.subscribe(e => event = e);

    fixture.debugElement.query(By.css('.item-form input')).nativeElement.value = 'test title';
    fixture.debugElement.query(By.css('.item-form input')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.js-add-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual({
      path: [], // not [0] here, because we set index to undefined imitating root node
      title: 'test title'
    } as TreeAddItemSubmitEvent);
  });

  it('should emit proper event on child adding new item', () => {
    component.data = {
      title: 'test 1',
      isRoot: false,
      children: [
        {title: 'test 1.1', isRoot: false, children: [], isExpanded: true},
        {title: 'test 1.2', isRoot: false, children: [], isExpanded: true},
        {title: 'test 1.3', isRoot: false, children: [], isExpanded: true}
      ],
      isExpanded: true // TRUE here
    };
    fixture.detectChanges();

    let event: TreeAddItemSubmitEvent;
    component.addItemSubmit.subscribe(e => event = e);

    fixture.debugElement.queryAll(By.css('tree-node .item-form input'))[2].nativeElement.value = 'test title';
    fixture.debugElement.queryAll(By.css('tree-node .item-form input'))[2].nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.queryAll(By.css('tree-node .js-add-btn'))[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
    expect(event).toEqual({
      path: [0, 2],
      title: 'test title'
    } as TreeAddItemSubmitEvent);
  });

  it('should validate new item form input', () => {
    component.titleMinLength = 2;
    component.titleMaxLength = 5;
    component.data = {
      title: 'test 1',
      isRoot: false,
      children: [],
      isExpanded: true // TRUE here
    };
    fixture.detectChanges();

    let event: TreeAddItemSubmitEvent;
    component.addItemSubmit.subscribe(e => event = e);

    fixture.debugElement.query(By.css('.item-form input')).nativeElement.value = '';
    fixture.debugElement.query(By.css('.item-form input')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.js-add-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeUndefined();

    fixture.debugElement.query(By.css('.item-form input')).nativeElement.value = '123456';
    fixture.debugElement.query(By.css('.item-form input')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.js-add-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeUndefined();

    fixture.debugElement.query(By.css('.item-form input')).nativeElement.value = '12345';
    fixture.debugElement.query(By.css('.item-form input')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.js-add-btn')).triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(event).toBeDefined();
  });

  it('should validate new item form input', () => {
    
  });
});
