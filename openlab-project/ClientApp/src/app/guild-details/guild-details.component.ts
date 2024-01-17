import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GuildService } from '../guilds/guild.service';
import { GuildDetailsInfo } from './guild-details-info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { GuildInfo } from '../guilds/guild-info';

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

    guildDetail = signal<GuildDetailsInfo>(undefined);

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

   constructor(private guildservice: GuildService) { }

    removeGuild(guildId) {
      this.guildservice.removeGuild(guildId)
        .pipe(takeUntil(this.destroy$))
        .subscribe()
    //this.router.navigate(['/guilds']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
