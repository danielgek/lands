
import * as transition from "ui/transition/transition";
import * as platform from "platform";
import lazy from "utils/lazy";

const screenWidth = lazy(() => platform.screen.mainScreen.widthPixels);
const screenHeight = lazy(() => platform.screen.mainScreen.heightPixels);

let interpolator = lazy(() => new android.view.animation.AccelerateDecelerateInterpolator());
export class CustomTransition extends transition.Transition {
    private _direction: string;

    constructor(duration?: number, curve = interpolator()) {
        super(duration, curve);
    }

    public createAndroidAnimator(transitionType: string): android.animation.Animator {

        const animatorSet = new android.animation.AnimatorSet();
        const fullDuration = this.getDuration() || 300;
        const interpolator = this.getCurve();
        let translationValues = Array.create("float", 2);
        let alphaValues = Array.create("float", 2);

        switch (transitionType) {
            case transition.AndroidTransitionType.enter:
                translationValues[0] = screenHeight();
                translationValues[1] = 0;
                break;
            case transition.AndroidTransitionType.exit:
                translationValues[0] = 0;
                translationValues[1] = 0;
                break;
            case transition.AndroidTransitionType.popEnter:
                translationValues[0] = 0;
                translationValues[1] = 0;
                break;
            case transition.AndroidTransitionType.popExit:
                translationValues[0] = 0;
                translationValues[1] = screenHeight();
                break;
        }

        switch (transitionType) {
            case transition.AndroidTransitionType.enter:
                alphaValues[0] = 0;
                alphaValues[1] = 1;
                break;
            case transition.AndroidTransitionType.popEnter:
                alphaValues[0] = 0;
                alphaValues[1] = 1;
                break;
            case transition.AndroidTransitionType.exit:
                alphaValues[0] = 1;
                alphaValues[1] = 0;
                break;
            case transition.AndroidTransitionType.popExit:
                alphaValues[0] = 1;
                alphaValues[1] = 0;
                break;
        }


        const animatorTranlation = android.animation.ObjectAnimator.ofFloat(null, "translationY", translationValues);
        const animatorAlpha = android.animation.ObjectAnimator.ofFloat(null, "alpha", alphaValues);

        let objectAnimators = Array.create(android.animation.Animator, 2);

        animatorTranlation.setDuration(fullDuration);
        animatorAlpha.setDuration(fullDuration);
        animatorTranlation.setInterpolator(interpolator);
        animatorAlpha.setInterpolator(interpolator);

        objectAnimators[0] = animatorTranlation;
        objectAnimators[1] = animatorAlpha;
        animatorSet.playTogether(objectAnimators);
        return animatorSet;
    }

    public toString(): string {
        return `${super.toString()} ${this._direction}`;
    }
}