import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumToolsComponent } from './forum-tools.component';

describe('ForumToolsComponent', () => {
  let component: ForumToolsComponent;
  let fixture: ComponentFixture<ForumToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
