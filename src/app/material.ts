import {
	MatInputModule,
	MatFormFieldModule,
	MatIconModule,
	MatCardModule,
	MatButtonModule,
	MatSidenavModule,
	MatListModule,
	MatButtonToggleModule,
	MatToolbarModule,
	MatCheckboxModule,
	MatSelectModule,
	MatSnackBarModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatSelectModule,
		MatSnackBarModule
	],
	exports: [
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
		MatCardModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatButtonToggleModule,
		MatToolbarModule,
		MatCheckboxModule,
		MatSelectModule,
		MatSnackBarModule
	],
})

export class MaterialModule { }