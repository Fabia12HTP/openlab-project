import { Component, Input, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GuildService } from '../guilds/guild.service';
import { GuildDetailsInfo } from './guild-details-info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { GuildInfo } from '../guilds/guild-info';
import { Router } from '@angular/router';

@Component({
    selector: 'app-guild-details',
    templateUrl: './guild-details.component.html',
    styleUrls: ['./guild-details.component.css'],
})
export class GuildDetailsComponent implements OnInit, OnDestroy {
    authService = inject(AuthorizeService);
    guildService = inject(GuildService);
    snackBar = inject(MatSnackBar);

    @Input('guildId') guildIdFromRoute: number;
    private destroy$ = new Subject<void>(); 

    private user = toSignal(this.authService.getUser());

    guildDetail = signal<GuildDetailsInfo>(undefined);
    isUserInGuild =
      computed(() => !!this.guildDetail()?.members.
        find(member => member.name === this.user.name))

    ngOnInit(): void {
        if (this.guildIdFromRoute) {
            this.guildService.getGuildDetail(this.guildIdFromRoute)
                .pipe(takeUntil(this.destroy$))
                .subscribe(guildDetail => this.guildDetail.set(guildDetail));
        }
    }

    joinGuild(): void {
        this.guildService.addCurrentUserToGuild(this.guildIdFromRoute)
            .pipe(takeUntil(this.destroy$))
            .subscribe((guildDetail: GuildDetailsInfo) =>
                this.setDetailAndShowSnack(guildDetail, 'You have been added to the guild!', 'Something went wrong! Probably, you already are member of a guild.'));
    }

    leaveGuild() {
        this.guildService.leaveGuild()
            .pipe(takeUntil(this.destroy$))
            .subscribe((guildDetail: GuildDetailsInfo) =>
                this.setDetailAndShowSnack(guildDetail, 'You have been removed from the guild!', 'Something went wrong!'));
    }

    private setDetailAndShowSnack(guildDetail: GuildDetailsInfo, successMessage: string, failMessage: string) {
        if (guildDetail) {
            this.guildDetail.set(guildDetail);
            this.showSnack(successMessage);
        }
        else {
            this.showSnack(failMessage);
        }
    }

    private showSnack(message: string) {
        this.snackBar.open(message, null, {duration: 3000});
  }

  constructor(private guildservice: GuildService,/* private router: Router*/) { }

  removeGuild() {
    this.guildService.removeGuild(this.guildIdFromRoute)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.ShowSnack(this.guildIdFromRoute, 'You have deleted the guild!', 'Something went wrong!');
    //this.router.navigate(['/guilds']).then(() => { window.location.reload(); });
  }

  private ShowSnack(guildIdFromRoute , successMessage: string, failMessage: string) {
    if (guildIdFromRoute) {
      this.AnotherShowSnack(successMessage);
    }
    else {
      this.AnotherShowSnack(failMessage);
    }
  }

  private AnotherShowSnack(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
   

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
