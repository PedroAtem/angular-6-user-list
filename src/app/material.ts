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
	MatCheckboxModule
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
		MatCheckboxModule
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
		MatCheckboxModule
	],
})

export class MaterialModule { }