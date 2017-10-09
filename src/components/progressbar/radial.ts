import { 
    Component,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

const animationDuration = 1;
const backgroundColor = "#d6dadc";
const circleColor = "#97a71d";
const indent = 10;

interface ProgressWheel {
    rotation: Observable<string>,
    fixRotation:  Observable<string>,
    animationDuration: string;
    animationDelay: string
};

@Component({
    selector: 'progress-bar[type=radial]',
    template: `
    <div class="circle" *ngFor="let wheel of wheels">
        <div class="mask full" [style.transform]="wheel.rotation | async"  [style.transitionDelay]="wheel.animationDelay">
            <div class="fill" [style.transform]="wheel.rotation | async"  [style.transitionDelay]="wheel.animationDelay"></div>
        </div>
        <div class="mask half"  [style.transitionDelay]="wheel.animationDelay"> 
            <div class="fill" [style.transform]="wheel.rotation | async"  [style.transitionDelay]="wheel.animationDelay"></div>
            <div class="fill fix" [style.transform]="wheel.fixRotation | async"  [style.transitionDelay]="wheel.animationDelay"></div>
        </div>
    </div>
    `,
    styles: [`
        :host { 
            display: block;
            background-color: ${backgroundColor};
            border-radius: 50%;
            width: 100%;
            height: 100%;
            position: relative;
        }

        :host:after {
            content: "";
            display: block;
            position: absolute;
            border-radius: 50%;
            top: ${indent}%;
            left: ${indent}%;
            bottom: ${indent}%;
            right: ${indent}%;
            background-color: ${backgroundColor};
        }

        .circle {
            position: absolute;
        }

        .circle, .mask, .fill {
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }

        .mask, .fill {
            position: absolute;

            transition: -webkit-transform ${animationDuration}s;
			transition: -ms-transform ${animationDuration}s;
			transition: transform ${animationDuration}s;
            -webkit-backface-visibility: hidden;
            transition-timing-function: linear;
            
            transform: rotate(0deg);
        }

        .mask {
            clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
        }

        .fill {
            clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
        }

        .circle:nth-child(odd) .fill {
            
            background-color: ${circleColor};
        }

        .circle:nth-child(even) .fill {
            background-color: #2980b9;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialProgressBar {
    private _progress: number;
    get progress() { return this._progress; }
    @Input()
    set progress(value: number) {
        this._progress = value;

        this._wheels = new Array(Math.ceil(this.progress / 100))
        .fill(0)
        .map((value, index, array) => {
            const rotation = index < (array.length - 1) ? 180 : (1.8 * this.progress % 100);
            return {
                rotation: Observable.timer(1).map(() => `rotate(${rotation}deg)`).share(),
                fixRotation: Observable.timer(1).map(() => `rotate(${rotation * 2}deg)`).share(),
                animationDuration: `${animationDuration}s`,
                animationDelay: `${index * animationDuration}s`
            };
        });
    }

    private _wheels: ProgressWheel[] = [];
    private get wheels(): ProgressWheel[] {
        return this._wheels;
    }
}
