export const postedTimeForComment = (timeInMileSec: number): string => {
	const sec: number = Math.floor(timeInMileSec / 1000);
	const min: number = Math.floor(timeInMileSec / (1000 * 60));
	const hrs: number = Math.floor(timeInMileSec / (1000 * 60 * 60));
	const days: number = Math.floor(timeInMileSec / (1000 * 60 * 60 * 24));
	const weeks: number = Math.floor(timeInMileSec / (1000 * 60 * 60 * 24 * 7));
	const months: number = Math.floor(timeInMileSec / (1000 * 60 * 60 * 24 * 31));
	const years: number = Math.floor(timeInMileSec / (1000 * 60 * 60 * 24 * 12));

	if (sec < 60) {
		return 'seconds';
	} else if (min < 60) {
		return min + ' mins';
	} else if (hrs < 24) {
		return hrs + ' hrs';
	} else if (days < 7) {
		return days + ' days';
	} else if (weeks < 4) {
		return weeks + ' weeks';
	} else if (months < 12) {
		return months + ' months';
	} else {
		return years + ' year';
	}
};
