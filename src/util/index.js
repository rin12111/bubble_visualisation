import { TRANSITION_DURATION } from "../contants";

export const limiter = (callback) => {
    setTimeout(() => {
        callback();
    }, TRANSITION_DURATION * 3);
}