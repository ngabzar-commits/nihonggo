import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="onClick.emit()"
      class="flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 active:scale-95 w-full aspect-square"
      [ngClass]="colorClass()"
    >
      <div class="text-3xl mb-2">{{ icon() }}</div>
      <span class="font-semibold text-sm">{{ label() }}</span>
    </button>
  `
})
export class FeatureCardComponent {
  label = input.required<string>();
  icon = input.required<string>();
  colorClass = input<string>('bg-slate-800 hover:bg-slate-700');
  onClick = output<void>();
}