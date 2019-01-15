import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecompanyComponent } from './profilecompany.component';

describe('ProfilecompanyComponent', () => {
  let component: ProfilecompanyComponent;
  let fixture: ComponentFixture<ProfilecompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilecompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
