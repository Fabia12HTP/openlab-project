import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {
  guildForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    maxmember: new FormControl('', Validators.required),
  })

  onSubmit() {
    console.warn(this.guildForm.value);
    
  }
}
export interface GuildInfo {
  id: number;
  name: string;
  capacity: number;
  description: string;
  membersCount: number;
}

