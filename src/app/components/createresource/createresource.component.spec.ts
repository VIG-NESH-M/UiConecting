import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateresourceComponent } from './createresource.component';

describe('CreateresourceComponent', () => {
  let component: CreateresourceComponent;
  let fixture: ComponentFixture<CreateresourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateresourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
