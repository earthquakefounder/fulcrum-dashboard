import {
    Component
} from '@angular/core';

import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    selector: 'fulcrum',
    template: `
        <progress-bar type="radial" [progress]="45"></progress-bar>
        <div *ngIf="loading">Loading Time Tracking data....</div>
        <div *ngIf="data | async as context">
            <div *ngFor="let project of context.projects">
                <progress-bar type="radial"  [progress]="calculateProgress(project.workedTime, project.allocatedTime)"></progress-bar>
                <div>{{project.customer}} {{project.name}}</div>
            </div>
        </div>
    `,
    styles: [
        `progress-bar { width: 150px; height: 150px }`
    ]
})
export class AppComponent {
    private data: any;
    private loading: boolean = true;
    constructor(private http: HttpClient) {
        this.data = http.get('http://localhost:44440/timetracking').do(() => this.loading = false);
    }

    private calculateProgress(current, total) {
        return current / total * 100;
    }
}