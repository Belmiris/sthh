import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { AuthData } from 'src/app/models/auth-data.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  private auth: AuthData = new AuthData('', '', '', -1, '', '');
  private dataUrl: string = "";

  constructor(private settings: SettingsService) { }

  ngOnInit() {
    const tmp : AuthData = this.settings.getAuth();
    if (tmp != undefined && tmp != null) {
      this.auth = tmp;
      this.dataUrl = this.settings.settings.DataUrl + "";
    }
  }
}
