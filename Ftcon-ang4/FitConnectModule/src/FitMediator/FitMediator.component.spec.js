"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var FitMediator_component_1 = require("./FitMediator.component");
describe('FitDialogComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [FitMediator_component_1.FitMediatorComponent]
        });
        fixture = testing_1.TestBed.createComponent(FitMediator_component_1.FitMediatorComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        el = de.nativeElement;
    });
    it('Should be false', function () {
        expect(false).toBe(true);
    });
});
