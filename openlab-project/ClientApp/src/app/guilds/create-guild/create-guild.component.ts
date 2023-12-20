import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {
  guildForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    maxmember: new FormControl(''),
  })

  onSubmit() {
    console.warn(this.guildForm.value);
  }
}
