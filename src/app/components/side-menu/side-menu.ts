import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-side-menu',
  imports: [CommonModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  menuLabel: string | undefined;
  visible: boolean = true;

}
