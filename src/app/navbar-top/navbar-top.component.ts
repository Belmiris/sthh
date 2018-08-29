import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthData } from 'src/app/models/auth-data.model';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  @Input() title: string;
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
