import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [MatButton],
  templateUrl: './block.component.html',
  styleUrl: './block.component.css',
})
export class BlockComponent {}
