import * as application from 'application';
import * as platform from 'platform';
import * as frameModule from 'ui/frame';
import { Color } from 'color';
declare var org: any;
declare var android: any;
declare var UIColor: any;
export const setupStatusBar = () => {
    if (application.android && platform.device.sdkVersion >= '21') {
        let View = android.view.View;
        let Window = android.view.Window;
        let window = application.android.foregroundActivity.getWindow();
        window.setStatusBarColor(new Color(8, 0, 0, 0).android);
        // window.requestFeature(Window.FEATURE_ACTION_BAR_OVERLAY);
        let decorView = window.getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );
    }

    if (application.ios) {
        let controller = frameModule.topmost().ios.controller;
        let navigationBar = controller.navigationBar;
        // set bar color to a nice dark blue with RGBA
        navigationBar.barTintColor = UIColor.colorWithRedGreenBlueAlpha(0, 0.24, 0.45, 1);
    }
};