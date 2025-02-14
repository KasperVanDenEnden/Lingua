import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'lingua-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() error: string | null = null;
  @Output() valueChange = new EventEmitter();

  value = '';

  onValueChange() {
    this.valueChange.emit(this.value);
  }
}
