const relativeTimeFormat = new Intl.RelativeTimeFormat("es", {
	numeric: "auto",
});

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

type RelativeUnit = Intl.RelativeTimeFormatUnit;

function pickUnit(seconds: number): { value: number; unit: RelativeUnit } {
	const abs = Math.abs(seconds);
	if (abs < MINUTE) return { value: seconds, unit: "second" };
	if (abs < HOUR) return { value: seconds / MINUTE, unit: "minute" };
	if (abs < DAY) return { value: seconds / HOUR, unit: "hour" };
	if (abs < WEEK) return { value: seconds / DAY, unit: "day" };
	if (abs < MONTH) return { value: seconds / WEEK, unit: "week" };
	if (abs < YEAR) return { value: seconds / MONTH, unit: "month" };
	return { value: seconds / YEAR, unit: "year" };
}

/**
 * Spanish relative label for a review date, e.g. "hace 2 días",
 * "la semana pasada" or "hace 3 semanas". `now` is injectable for tests.
 */
export function relativeTime(date: Date, now: Date = new Date()): string {
	const seconds = (date.getTime() - now.getTime()) / 1000;
	const { value, unit } = pickUnit(seconds);
	return relativeTimeFormat.format(Math.round(value), unit);
}
