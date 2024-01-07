import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuildService } from '../guild.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css'],
  imports: [ReactiveFormsModule],
})
export class CreateGuildComponent {

  newGuild = signal<guildcreate>(undefined);
  private destroy$ = new Subject<void>();


  guildForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
  });

  constructor(private guildservice: GuildService) { }

  onSubmit() {
    var newGuild = {
      guildName: this.guildForm.controls['name'].value,
      guildDescription: this.guildForm.controls['description'].value,
      guildMaxCapacity: this.guildForm.controls['capacity'].value
    }
    this.guildservice.saveGuild(newGuild).pipe(takeUntil(this.destroy$)).subscribe()
  }
}
export interface guildcreate{
  guildName: string,
  guildDescription: string,
  guildMaxCapacity: string,
}

