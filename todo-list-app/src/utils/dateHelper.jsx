const moment = require('moment-timezone')

export default class DateHelper {
	static format(date, format = 'YYYY-MM-DD hh:mm A') {
		if (!date) { return '' }
		return moment.tz(date, moment.tz.guess(true)).format(format)
	}

	static isSameDay(a, b) {
		if (!a || !b) { return false }

		const format = 'YYYY-MM-DD'
		return DateHelper.format(a, format) === DateHelper.format(b, format)
	}

	static getDayOfYear(date = new Date()) {
		return parseInt(DateHelper.format(date, 'DDD DDDD'))
	}
}