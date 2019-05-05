import {Component, OnInit} from '@angular/core';
import {VerticalNavigationItem} from 'patternfly-ng/navigation/vertical-navigation/vertical-navigation-item';
import {Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {Action, NotificationEvent, NotificationService, NotificationType, Notification} from 'patternfly-ng';
import {WetrAuthenticationService} from './shared/wetr-authentication.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {WetrCommunication} from './shared/wetr-communication.service';
import Community = WetrCommunication.Community;

@Component({
  selector: 'wea5-root',
  templateUrl: './app.component.html',
  styles: [`
    .faux-layout {
      position: fixed;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;
      background: url("../assets/img/Background.png");
      padding-top: 15px;
      z-index: 1100;
    }
    .example-page-container.container-fluid {
      position: fixed;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;
      background: url("../assets/img/Background.png");
      padding-top: 15px;
    }

    .hide-vertical-nav {
      margin-top: 15px;
      margin-left: 30px;
    }

    .navbar-brand-txt {
      line-height: 45px;
    }
  `]
})

export class AppComponent implements OnInit {
  title = 'Wetr';
  navigationItems: VerticalNavigationItem[];
  LogoContainer: string;

  // Notifications
  actionText = '';
  header = 'Default Header.';
  isPersistent = false;
  message = 'Default Message.';
  moreActions: Action[];
  moreActionsDefault: Action[];
  notifications: Notification[];
  primaryAction: Action;
  showClose = false;
  showMoreActions = false;
  type: string;
  types: string[];
  typeMap: any;

  // Logout
  // userName: String = this.authService.getActualUser();
  visibility = this.authService.getActualUser() != null;

  // Communitysearch
  states: String[] = [];

  public model: any;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  constructor(private chRef: ChangeDetectorRef, private router: Router,
              private notificationService: NotificationService,
              private authService: WetrAuthenticationService,
              private stationConn: WetrCommunication.StationsClient,
              private communities: WetrCommunication.CommunitiesClient) {
  }

  ngOnInit(): void {
    this.initNotifications();
    this.communities.getAll().subscribe(x => this.initCommunities(x));
    this.authService.display.subscribe(x => this.initVisibility(x));
    this.navigationItems = [
      {
        title: 'Dashboard',
        iconStyleClass: 'fa fa-sun-o',
        activeOnLoad: true,
        url: '/home'
      },
      {
        title: 'Search',
        iconStyleClass: 'fa fa-search',
        url: '/search'
      },
      {
        title: 'Stations',
        iconStyleClass: 'fa fa-thermometer-half',
        url: '/login'
      }
      ];
  }

  initCommunities(x: Community[]) {
    for (const c of x) {
        this.states.push(c.name);
    }
  }

  searchStarted() {
    this.communities.getByName(this.model).subscribe(x => this.openSearchView(x));
    this.model = '';
  }

  openSearchView(x: Community[]) {
    if (x != null || x.length > 0) {
      this.router.navigate(['search/community', x[0].id]);
    } else {
      this.router.navigate(['search/community', -1]);
    }
  }

  initVisibility(x: boolean) {
    this.visibility = x;
  }

  onItemClicked($event: VerticalNavigationItem): void {
  }

  onNavigation($event: VerticalNavigationItem): void {
  }

  initNotifications() {
    this.notifications = this.notificationService.getNotifications();

    this.typeMap = {
      'info': NotificationType.INFO,
      'success': NotificationType.SUCCESS,
      'warning': NotificationType.WARNING,
      'danger': NotificationType.DANGER
    };
    this.types = Object.keys(this.typeMap);
    this.type = this.types[0];

    this.primaryAction = {
      id: 'action1',
      name: '', // left empty for input
      title: 'Perform an action'
    } as Action;

    this.moreActionsDefault = [{
      id: 'moreActions1',
      name: 'Action',
      title: 'Perform an action'
    }, {
      id: 'moreActions2',
      name: 'Another Action',
      title: 'Do something else'
    }, {
      disabled: true,
      id: 'moreActions3',
      name: 'Disabled Action',
      title: 'Unavailable action'
    }, {
      id: 'moreActions4',
      name: 'Something Else',
      title: 'Do something special'
    }, {
      id: 'moreActions5',
      separator: true
    }, {
      id: 'moreActions6',
      name: 'Grouped Action 1',
      title: 'Do something'
    }, {
      id: 'moreActions7',
      name: 'Grouped Action 2',
      title: 'Do something similar'
    }] as Action[];
  }
// Action functions

  handleAction($event: NotificationEvent): void {
    // Get the Action we provided and output its name
    this.actionText = $event.action.title + '\n' + this.actionText;
  }

  handleClose($event: NotificationEvent): void {
    this.actionText = 'Close' + '\n' + this.actionText;
    this.notificationService.remove($event.notification);
  }

  handleType(item: string): void {
    this.type = item;
  }

  handleViewingChange($event: NotificationEvent): void {
    this.notificationService.setViewing($event.notification, $event.isViewing);
  }

  notify(): void {
    this.notificationService.message(
      this.typeMap[this.type],
      this.header,
      this.message,
      this.isPersistent,
      this.primaryAction,
      this.moreActions);
  }

  HandleLogout() {
    this.visibility = false;
    this.authService.Logout();
  }


}



