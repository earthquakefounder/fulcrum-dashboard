import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RadialProgressBar } from './radial';

describe('Radial progress bar', () => {
    let fixture: ComponentFixture<RadialProgressBar>;
    let component: RadialProgressBar;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RadialProgressBar]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RadialProgressBar);
        component = fixture.componentInstance;
    });

    it('should contain a single wheel with the correct rotation', async(() => {
        component.progress = 25; /* Progress at 25% */
        fixture.detectChanges();

        setTimeout(() => {
            expect(fixture.debugElement.query(By.css('.fill')).nativeElement.style.transform).toBe(`rotate(${360 * component.progress / 100 * .5}deg)`);
            expect(fixture.debugElement.queryAll(By.css('.circle')).length).toBe(1);
        }, 10);
    }));
})