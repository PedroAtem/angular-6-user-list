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
	MatSnackBarModule,
	MatDialogModule,
	MatMenuModule
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
		MatSnackBarModule,
		MatDialogModule,
		MatMenuModule
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
		MatSnackBarModule,
		MatDialogModule,
		MatMenuModule
	],
})

export class MaterialModule { }