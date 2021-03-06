import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { TOOLTIP_DIRECTIVES, PAGINATION_DIRECTIVES, TAB_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { Dropdown, SelectItem, TabView, TabPanel, Dialog } from 'primeng/primeng';
import { AppDisplayMobile, AppsTab } from '../../theme/interfaces';
import { GridDataService, PageService, FormDataService } from '../../theme/services';
import { GlobalStyleService } from '../../pages/settings/app-display/global-style.service';
import { SettingsService } from '../../pages/settings/settings.service';


@Component({
    selector: 'app-display-global',
    directives: [TOOLTIP_DIRECTIVES, Dropdown, TabView, TabPanel, Dialog, PAGINATION_DIRECTIVES, TAB_DIRECTIVES],
    encapsulation: ViewEncapsulation.None,
    template: require('./app-display-global.component.html'),
})

export class GlobalStyleAppDisplay {
    @Input() globalSettings: any;
    @Input() appId: any;
    @Input() selectedTab: any;

     constructor(
        private dataService: GridDataService,
        private pageService: PageService,
        private globalStyleService: GlobalStyleService,
        private settingsService: SettingsService
    ) {
    }
}