import { 
    Component,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/share';

const animationDuration = 1;
const backgroundColor = "#d6dadc";
const circleColor = "#97a71d";
const indent = 10;

interface RadialData {
    counter: Observable<number>,
    wheels: {
        rotation: Observable<string>,
        fixRotation:  Observable<string>
    }[]
};

@Component({
    selector: 'progress-bar[type=radial]',
    template: `
    <div class="counter">{{data.counter | async}}</div>
    <div class="circle" *ngFor="let wheel of data.wheels">
        <div class="mask full" [style.transform]="wheel.rotation | async">
            <div class="fill" [style.transform]="wheel.rotation | async"></div>
        </div>
        <div class="mask half"> 
            <div class="fill" [style.transform]="wheel.rotation | async"></div>
            <div class="fill fix" [style.transform]="wheel.fixRotation | async"></div>
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

        .circle, .counter {
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
    constructor() {
        this.progress = 0;
    }

    private _progress: number;
    get progress() { return this._progress; }
    @Input()
    set progress(value: number) {
        this._progress = value;

        const iterations = Math.ceil(value / 100);
        this.data = {
            counter: Observable.timer(1, iterations * 1000 / value).map(x => x + 1).takeWhile(current => current < value),
            wheels: new Array(iterations)
                .fill(0)
                .map((value, index, array) => {
                    const rotation = index < (array.length - 1) ? 180 : (1.8 * (this.progress % 100));
                    const emitTimer =  1 + ((animationDuration * 1000) + 1) * index;
                    
                    return {
                        rotation: Observable.timer(emitTimer).map(() => `rotate(${rotation}deg)`).share(),
                        fixRotation: Observable.timer(emitTimer).map(() => `rotate(${rotation * 2}deg)`).share()
                    };
                })
        };
    }

    private data: RadialData;
}
