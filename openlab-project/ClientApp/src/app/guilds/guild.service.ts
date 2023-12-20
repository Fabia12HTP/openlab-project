import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { GuildInfo } from './guild-info';
import { Observable } from 'rxjs/internal/Observable';
import { GuildDetailsInfo } from '../guild-details/guild-details-info';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
    private guildsUrl = this.baseUrl + 'guilds/';
    
    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getGuildList() {
        return this.http.get<GuildInfo[]>(this.guildsUrl);
    }

    getGuildDetail(guildId: number): Observable<GuildDetailsInfo> {
        return this.http.get<GuildDetailsInfo>(this.guildsUrl + guildId);
    }

    addCurrentUserToGuild(guildId: number): Observable<GuildDetailsInfo> {
        return this.http.post<GuildDetailsInfo>(this.guildsUrl + 'join', { guildId });
    }

    leaveGuild() {
        return this.http.delete<GuildDetailsInfo>(this.guildsUrl + 'leave');
    }

    //sendData() {
    //  var inputDataElement = document.getElementById("inputData") as HTMLInputElement;
    //  var inputData = inputDataElement.value;

    //  var data = {
    //    inputData: inputData
    //  };

    //  fetch('http://your-backend-api-endpoint/', {
    //    method: 'PUT',
    //    headers: {
    //      'Content-Type': 'application/json'
    //    },
    //    body: JSON.stringify(data)
    //  })
    //    .then(response => response.json())
    //    .then(data => {
    //      console.log('Odpoveď zo servera:', data);
    //    })
    //    .catch(error => {
    //      console.error('Chyba pri odosielaní dát:', error);
    //    });
    //}

}
