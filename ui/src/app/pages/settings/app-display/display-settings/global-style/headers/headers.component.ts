/**
 * Header Component
 * 
 * 
 */
import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { DROPDOWN_DIRECTIVES, TAB_DIRECTIVES, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { InputSwitch, Slider } from 'primeng/primeng';
import { PageService, GridDataService } from '../../../../../../theme/services';
import { RouteParams } from '@angular/router-deprecated';
import { Dragula, DragulaService } from 'ng2-dragula/ng2-dragula';
import { GlobalStyleSettings } from '../../../../../../theme/interfaces';
import { GlobalStyleService } from '../../../global-style.service';
import { AppState } from '../../../../../../app.state';
import { ColorPickerDirective } from "../../../../../../color-picker/color-picker.directive";


@Component({
    selector: 'headers',
    directives: [TOOLTIP_DIRECTIVES, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, InputSwitch, Slider, ColorPickerDirective],
    template: require('./headers.component.html'),
})

export class HeaderGlobalComponent {
    checked: boolean = true;
    public appId: number;
    public headerBackgroundImg: File = null;
    public noImage: boolean = false;

    constructor(private params: RouteParams,
        private service: GlobalStyleService,
        private appState: AppState,
        private pageService: PageService,
        private dataService: GridDataService) {

        this.appId = appState.dataAppId;
    }

    public onGlobalHeaderBgImageChange(event): void {
        this.headerBackgroundImg = event.target.files[0];
        this.service.headerBackgroundImageTarget = event.target;
    }

    public onGlobalHeaderBgImgUploadClick(): void {
        PageService.showLoader();
        this.service.uploadHeaderBackgroundImg(this.headerBackgroundImg, this.appId).subscribe(res => {
            PageService.hideLoader();
            if (res.success) {
                this.service.headerBackgroundImageTarget.value = null;
                this.headerBackgroundImg =null;
                this.pageService.showSuccess("Background image saved");
                this.getHeaderImages();
                this.service.globalStyleSettings.header.background_img = res.createdImgId;

            } else {
                this.pageService.showError(res.message);
            }
        });
    }

    public getHeaderImages(): void {
        this.service.getHeaderBackrgroundImagesList(this.appId).subscribe(res => {
            if (res.success) {
                this.service.headerBackgroundImages = res.data;
                for (let val of res.data) {
                    this.service.headerBgImageSrcs[val.id] = val.name;
                }
            }
        });
    }

    public onBackgroundImgClick(id: number): void {
        this.noImage = false;
        this.service.globalStyleSettings.header.background_img = id;
    }

    public onDeleteHeaderBgImageClick(event, id: number): void {
        event.stopPropagation();
        if (confirm("Are you sure you want to delete this ?")) {
            PageService.showLoader();
            this.service.deleteHeaderBgImage(id).subscribe(res => {
                PageService.hideLoader();
                if (res.success) {
                    this.pageService.showSuccess(res.message);
                    this.dataService.getByID(this.service.headerBackgroundImages, id, (data, index) => {
                        this.service.headerBackgroundImages.splice(index, 1);
                        this.service.headerBgImageSrcs[data.id] = null;
                    });
                } else {
                    this.pageService.showSuccess(res.message);
                }
            });
        }
    }

    public onNoImage(): void {
        this.noImage = true;
        this.service.globalStyleSettings.header.background_img = null;
    }
}
