import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tr-shell',
  imports: [RouterOutlet],
  templateUrl: './shell.component.html',
  standalone: true,
})
export default class ShellComponent {}
