//import { Component, OnInit, inject } from '@angular/core';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
//import { Observable } from 'rxjs';
//import { GuildService } from '../guild.service';
//import { ActivatedRoute, Route, Router } from '@angular/router';

//@Component({
//  standalone: true,
//  selector: 'app-create-guild',
//  templateUrl: './create-guild.component.html',
//  styleUrls: ['./create-guild.component.css'],
//  imports: [ReactiveFormsModule],
//})
//export class CreateGuildComponent implements OnInit {

//  guildService = inject(GuildService);

//  successmsg: any;
//  errormsg: any;

//  // guildCreateInfo: GuildCreateInfo = new GuildCreateInfo();

//  guildForm = new FormGroup({
//    name: new FormControl('', Validators.required),
//    description: new FormControl('', Validators.required),
//    maxmember: new FormControl('', Validators.required),
//  });

//  constructor(
//    private fb: FormGroup,
//    private apiservice: GuildService,
//    private actrouter: ActivatedRoute,
//    private router: Router
//  ) {
//  }

//  onSubmit() {
//    if (!this.guildForm.valid) {
//      return;
//    }

//    const guildCreateInfo = {
//      name: this.guildForm.value.name,
//      capacity: parseInt(this.guildForm.value.maxmember),
//      description: this.guildForm.value.description,
//    };

//    this.guildService.createNewGuild(guildCreateInfo).subscribe(
//      (res) => {
//        console.log(res, 'data submited');
//        this.guildForm.reset();
//        this.successmsg = res.message;
//      },
//      (err) => {
//        console.error('Error creating guild:', err);
//        this.errormsg = 'Error creating guild. Please try again.';
//      }
//    );
//  }

//  ngOnInit(): void {
//    this.guildForm = new FormGroup({
//      name: new FormControl('', Validators.required),
//      description: new FormControl('', Validators.required),
//      maxmember: new FormControl('', Validators.required),
//    });
//  }
//}

//export interface GuildCreateInfo {
//  name: string;
//  capacity: number;
//  description: string;
//}

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

  constructor(private guildservice : GuildService) { }

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
