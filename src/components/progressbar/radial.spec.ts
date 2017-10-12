import { async, fakeAsync, tick, TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
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

    it('should contain a single wheel with the correct rotation when progress less than 100', fakeAsync(() => {
        component.progress = 25; /* Progress at 25% */
        fixture.detectChanges();

        const element: HTMLDivElement = fixture.debugElement.query(By.css('.fill')).nativeElement;

        tick(1);
        fixture.detectChanges();

        expect(element.style.transform).toBe(`rotate(${360 * component.progress / 100 * .5}deg)`);
        expect(fixture.debugElement.queryAll(By.css('.circle')).length).toBe(1);

        tick(1000);
    }));

    it('should contain multiple wheels with the correct rotation when progress greater than 100', fakeAsync(() => {
        component.progress = 150; /* Progress at 150% */
        fixture.detectChanges();

        const circleElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.circle'));

        expect(circleElements.length).toBe(2);

        const firstFill = circleElements[0].query(By.css('.fill')).nativeElement;
        expect(firstFill).not.toBeFalsy();

        const secondFill = circleElements[1].query(By.css('.fill')).nativeElement;
        expect(secondFill).not.toBeFalsy();

        tick(1);
        fixture.detectChanges();
        expect(firstFill.style.transform).toBe(`rotate(180deg)`);

        tick(1001);
        fixture.detectChanges();
        expect(secondFill.style.transform).toBe(`rotate(90deg)`);

        tick(2000);
    }));

    it('should update the counter on an interval that completes in a second', fakeAsync(() => {
        component.progress = 50;
        fixture.detectChanges();

        const element: DebugElement = fixture.debugElement.query(By.css('.counter'));
        tick(0);
        fixture.detectChanges();
        expect(element.nativeElement.textContent).toContain(1);

        //Moving one step ahead
        tick(1000 / 50);
        fixture.detectChanges();
        expect(element.nativeElement.textContent).toContain(2);

        //Moving to exactly the one second mark
        tick(1000 - 100 / 5);
        fixture.detectChanges();
        expect(element.nativeElement.textContent).toContain(50);
    }));
})