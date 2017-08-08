import * as application from 'application';
import * as platform from 'platform';
import * as frameModule from 'ui/frame';
import { Color } from 'color';
declare var org: any;
declare var android: any;
declare var UIColor: any;
declare var UIImage: any;
declare var UIBarMetrics: any;
declare var UIView: any;
declare var UIViewAutoresizingFlexibleWidth: any;
declare var UIViewAutoresizingFlexibleHeight: any;

export const setupStatusBar = () => {
    if (application.android && platform.device.sdkVersion >= '21') {
        let View = android.view.View;
        let Window = android.view.Window;
        let window = application.android.foregroundActivity.getWindow();
        window.setStatusBarColor(new Color(20, 0, 0, 0).android);
        // window.requestFeature(Window.FEATURE_ACTION_BAR_OVERLAY);
        let decorView = window.getDecorView();
        decorView.setSystemUiVisibility(
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE |
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
        );
    }

    if (application.ios) {
        if (frameModule.topmost().ios) {
            let navigationBar = frameModule.topmost().ios.controller.navigationBar ;
            navigationBar.translucent = true;
            navigationBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
            navigationBar.shadowImage = UIImage.new();
            //navigationBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0, 0, 0, 0.2);

            

            /**
             * Add custom view to navBar - if doesn't exist
            */
            let myView;
            let navBounds = navigationBar.bounds;

            
                myView = UIView.alloc().init();
                myView.frame = {
                    origin: { x: navBounds.origin.x, y: navBounds.origin.y - 20 },
                    size: { width: navBounds.size.width, height: navBounds.size.height + 20 }
                };
                myView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
                myView.userInteractionEnabled = false;
                myView.tag = 17;
                navigationBar.addSubview(myView);

                navigationBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
                navigationBar.sendSubviewToBack(myView);
            

        }
    }
};

export const setStatusBarWite = (light: boolean) => {
    if(platform.isIOS) {
        let navigationBar = frameModule.topmost().ios.controller.navigationBar;
        light ? navigationBar.barStyle = 1 : navigationBar.barStyle = 0;
    }
};