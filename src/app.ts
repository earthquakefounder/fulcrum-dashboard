import {
    Component
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'fulcrum',
    template: `
        <div *ngIf="data | async as context">
            <h1><u>Summary</u></h1>
            <label>
                Base hours:
                <input #input type="number" step=".25" min="6" max="10" [value]="baseHours" />
                x {{numberOfWorkdaysMonth}} work days = {{baseHours * numberOfWorkdaysMonth}} hours
                <button class="btn btn-primary" (click)="baseHours = input.value">Update</button>
            </label>
            <h3>Actual hours to date: {{calculateCurrentHoursWorked(context)}}</h3>
            <h3>Expected hours to date: {{baseHours * numberOfWorkdaysToDate}}</h3>
            <h3>To meet goal: avg {{(baseHours * numberOfWorkdaysMonth - calculateCurrentHoursWorked(context)) / numberOfWorkdaysRemaining }} hours per day</h3>
            <div class="project-container">
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
                    <progress-bar type="radial" [progress]="context.unassigned * 100 / (numberOfWorkdaysMonth * baseHours)"></progress-bar>
                    <div class="project-name">Unallocated</div>
                    <div class="project-summary">
                        <div>Unallocated: {{calculateUnallocated(context.projects)}}</div>
                        <div>Worked: {{context.unassigned}}</div>
                        <div>Remaining: {{calculateUnallocated(context.projects) - context.unassigned}}</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        progress-bar { width: 300px; height: 300px }

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

    private get numberOfWorkdaysMonth() {
        return calculateNumberOfWeekdays(new Date(2017, 9, 1), new Date(2017, 9, 31));
    }

    private get numberOfWorkdaysToDate() {
        return calculateNumberOfWeekdays(new Date(2017, 9, 1), new Date());
    }

    private get numberOfWorkdaysRemaining() {
        return this.numberOfWorkdaysMonth - this.numberOfWorkdaysToDate;
    }

    private calculateProgress(current, total) {
        return current / total * 100;
    }

    private calculateUnallocated(data: any[]) {
        return calculateNumberOfWeekdays(new Date(2017, 9, 1), new Date(2017, 10, 1)) * this.baseHours - data.reduce((p, c) => {
            return p + c.allocatedTime;
        }, 0);
    }

    private calculateCurrentHoursWorked(data: any) {
        return data.unassigned + data.projects.reduce((p, c) => p + c.workedTime, 0);
    }
}

var calculateNumberOfWeekdays = calculateNumberOfDays.bind(null, [1, 2, 3, 4, 5])

function calculateNumberOfDays(dayIndices: number[], start: Date, end: Date) {
    var ndays = 1 + Math.round(Math.abs(end.getTime() - start.getTime())/(24*3600*1000));
    
    return dayIndices.reduce((p, c) => {
        return p + Math.floor((ndays + (start.getDay() + 6 - c) % 7 ) / 7);  
    }, 0);
}