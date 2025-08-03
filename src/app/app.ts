import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { invoke } from '@tauri-apps/api/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('first-tauri');
  test = signal('test');

  constructor() {
    console.log('App component initialized');
    invoke('my_custom_command');
    invoke('hello_from_rust').then((response) => {
      console.log('Response from Rust:', response);
      if (typeof response === 'string') {
        console.log('Received string response:', response);
        this.test.set(response);
      }
    })
  }
}
