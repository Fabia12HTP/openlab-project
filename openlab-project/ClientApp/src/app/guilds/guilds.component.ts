import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { GuildService } from './guild.service';
import { Subject, takeUntil } from 'rxjs';
import { GuildInfo } from './guild-info';

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css'],
})
export class GuildsComponent implements OnInit, OnDestroy {
    guildService = inject(GuildService);

    private destroy$ = new Subject<void>();

    searchText = '';

    guilds = signal<GuildInfo[]>([]);

    ngOnInit(): void {
        this.guildService.getGuildList()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => this.guilds.set(result));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
