import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GuildService } from '../guild.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  snackBar = inject(MatSnackBar);



  guildForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
  });

  constructor(private guildservice: GuildService, private router: Router) { }

  onSubmit() {
    var newGuild = {
      guildName: this.guildForm.controls['name'].value,
      guildDescription: this.guildForm.controls['description'].value,
      guildMaxCapacity: this.guildForm.controls['capacity'].value
    }
    this.guildservice.saveGuild(newGuild)
      .pipe(takeUntil(this.destroy$))
      .subscribe()
    this.ShowSnack(newGuild, 'You have created the guild!', 'Something went wrong!');
    this.router.navigate(['/guilds']);
  }

  private ShowSnack(newGuild: guildcreate, successMessage: string, failMessage: string) {
    if (newGuild) {
      this.AnotherShowSnack(successMessage);
    }
    else {
      this.AnotherShowSnack(failMessage);
    }
  }

  private AnotherShowSnack(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
export interface guildcreate{
  guildName: string,
  guildDescription: string,
  guildMaxCapacity: string,
}

