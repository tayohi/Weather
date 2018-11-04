import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryWeatherComponent } from './history-weather.component';

describe('HistoryWeatherComponent', () => {
  let component: HistoryWeatherComponent;
  let fixture: ComponentFixture<HistoryWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
