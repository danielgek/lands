import { isAndroid } from 'platform';

import { AnimationCurve } from 'ui/enums';
import { CustomTransition } from "./custom-transition";

export const getDefaultTrasition = (left = true) => {
    let animation = 'slide';
    if (!left) {
        animation = 'slideRight';
    }
    if (isAndroid) {
        return {
            instance: new CustomTransition(300)
        };
    } else {
        return {};
    }
};
