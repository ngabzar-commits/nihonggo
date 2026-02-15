import { Component, ElementRef, ViewChild, AfterViewInit, signal, input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-writing-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col items-center gap-4 select-none">
      <div class="relative bg-white rounded-xl overflow-hidden shadow-lg border-4 border-slate-700 touch-none">
        <!-- Ghost Character for tracing -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span class="text-[180px] font-serif text-slate-200 opacity-60 leading-none">{{ character() }}</span>
        </div>
        
        <canvas 
          #canvas 
          class="relative z-10 cursor-crosshair touch-none"
          style="width: 300px; height: 300px;"
          (mousedown)="startDrawing($event)"
          (mousemove)="draw($event)"
          (mouseup)="stopDrawing()"
          (mouseleave)="stopDrawing()"
          (touchstart)="startDrawingTouch($event)"
          (touchmove)="drawTouch($event)"
          (touchend)="stopDrawing()"
        ></canvas>
      </div>

      <div class="flex gap-4">
        <button (click)="clearCanvas()" class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/30 active:scale-95 transition-transform">
          Hapus
        </button>
      </div>
      
      <p class="text-slate-400 text-sm mt-2">Ikuti garis abu-abu untuk menulis.</p>
    </div>
  `
})
export class WritingCanvasComponent implements AfterViewInit, OnChanges {
  character = input.required<string>();
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit() {
    this.initCanvas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['character'] && !changes['character'].firstChange) {
      this.clearCanvas();
    }
  }

  private initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    // Set actual size in memory (scaled to account for extra pixel density)
    canvas.width = 300 * dpr;
    canvas.height = 300 * dpr;
    
    this.ctx = canvas.getContext('2d')!;
    // Scale all drawing operations by the dpr, so you don't have to worry about it in your drawing code
    this.ctx.scale(dpr, dpr);
    
    this.ctx.lineWidth = 12;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#1e1e1e'; // Ink color
  }

  // --- MOUSE EVENTS ---
  startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    const { x, y } = this.getMousePos(e);
    [this.lastX, this.lastY] = [x, y];
  }

  draw(e: MouseEvent) {
    if (!this.isDrawing) return;
    const { x, y } = this.getMousePos(e);
    this.drawLine(x, y);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  // --- TOUCH EVENTS ---
  startDrawingTouch(e: TouchEvent) {
    if (e.cancelable) e.preventDefault(); // Prevent scrolling
    this.isDrawing = true;
    const { x, y } = this.getTouchPos(e);
    [this.lastX, this.lastY] = [x, y];
  }

  drawTouch(e: TouchEvent) {
    if (e.cancelable) e.preventDefault();
    if (!this.isDrawing) return;
    const { x, y } = this.getTouchPos(e);
    this.drawLine(x, y);
  }

  // --- HELPERS ---
  
  private drawLine(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    [this.lastX, this.lastY] = [x, y];
  }

  private getMousePos(e: MouseEvent) {
    // getBoundingClientRect ensures we get correct coordinates even if scrolled
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  private getTouchPos(e: TouchEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  clearCanvas() {
    if (!this.ctx) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the scaled full size
  }
}