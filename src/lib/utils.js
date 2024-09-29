export function friendlyTime(seconds) {
    let result = "";

    if (seconds >= 86400) {
        result += Math.floor(seconds / 86400) + "d ";
        seconds %= 86400;
    }

    if (seconds >= 3600) {
        result += Math.floor(seconds / 3600) + "h ";
        seconds %= 3600;
    }

    if (seconds >= 60) {
        result += Math.floor(seconds / 60) + "m ";
        seconds %= 60;
    }

    if (seconds > 0 || result === "") {
        result += seconds + "s";
    }

    return result;
}