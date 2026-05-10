import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  menuLabel: string | undefined;
  visible: boolean = true;

}
