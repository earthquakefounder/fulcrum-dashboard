import {
    Component
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'fulcrum',
    template: `
        <label>
            Base hours:
            <input #input type="number" step=".25" min="6" max="10" [value]="baseHours" />
            x {{numberOfWorkdays}} work days = {{baseHours * numberOfWorkdays}} hours
            <button class="btn btn-primary" (click)="baseHours = input.value">Update</button>
            
        </label>
        <div class="project-container" *ngIf="data | async as context">
            <div class="project" *ngFor="let project of context.projects">
                <progress-bar type="radial"  [progress]="calculateProgress(project.workedTime, project.allocatedTime)"></progress-bar>
                <div class="project-name">{{project.customer}} {{project.name}}</div>
                <div class="project-summary">
                    <div>Allocated: {{project.allocatedTime}}</div>
                    <div>Worked: {{project.workedTime}}</div>
                    <div>Remaining: {{project.allocatedTime - project.workedTime < 0 ? 0 : project.allocatedTime - project.workedTime}}</div>
                </div>
            </div>
            <div class="project">
                <progress-bar type="radial" [progress]="context.unassigned * 100 / (numberOfWorkdays * baseHours)"></progress-bar>
                <div class="project-name">Unallocated</div>
                <div class="project-summary">
                    <div>Unallocated: {{calculateUnallocated(context.projects)}}</div>
                    <div>Worked: {{context.unassigned}}</div>
                    <div>Remaining: {{calculateUnallocated(context.projects) - context.unassigned}}</div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        progress-bar { width: 250px; height: 250px }

        .project-container {
            display: flex;
            justify-content: space-between;
        }

        .project {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .project-name {
            font-size: 1.5em;
            font-weight: bold;
            margin-top: 5px;
            text-decoration: underline;
        }

        .project-summary {
            font-family: Verdana;
        }
    `]
})
export class AppComponent {
    private data: any;
    private loading: boolean = true;
    private baseHours: number;
    private remainingProgress: number;

    constructor(private http: HttpClient) {
        this.baseHours = 7.5;

        this.data = http.get('http://localhost:44440/timetracking').do<any>(time => {
            this.loading = false;
        });
    }

    private get numberOfWorkdays() {
        return calculateNumberOfWeekdays(new Date(2017, 9, 1), new Date(2017, 9, 31));
    }

    private calculateProgress(current, total) {
        return current / total * 100;
    }

    private calculateUnallocated(data: any[]) {
        return calculateNumberOfWeekdays(new Date(2017, 9, 1), new Date(2017, 9, 31)) * this.baseHours - data.reduce((p, c) => {
            return p + c.allocatedTime;
        }, 0);
    }
}

var calculateNumberOfWeekdays = calculateNumberOfDays.bind(null, [1, 2, 3, 4, 5])

function calculateNumberOfDays(dayIndices, start, end) {
    var ndays = 1 + Math.round((end - start)/(24*3600*1000));
    
    return dayIndices.reduce((p, c) => {
        return p + Math.floor((ndays + (start.getDay() + 6 - c) % 7 ) / 7);  
    }, 0);
}