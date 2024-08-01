import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGroupDetailsComponent } from './photo-group-details.component';

describe('PhotoGroupDetailsComponent', () => {
  let component: PhotoGroupDetailsComponent;
  let fixture: ComponentFixture<PhotoGroupDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoGroupDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
