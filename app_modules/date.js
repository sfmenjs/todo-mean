function date() {
	now = new Date();
	var AM_PM = function() {
		if(now.getHours() > 12) {
			return "PM";
		} else {
			return "AM";
		}
	}
	var getHours = function() {
		if(now.getHours() > 12) {
			return now.getHours() - 12;
		} else {
			return now.getHours();
		}
	}
	var getMinutes = function() {
		if(now.getMinutes() > 9) {
			return now.getMinutes();
		} else {
			return "0" + now.getMinutes();
		}
	} 
	var getDate = function() {
		return {
			year : now.getFullYear(),
			month : now.getMonth() + 1,
			day : now.getDate(),
			hours : getHours(),
			minutes : getMinutes(),
			AM_PM : AM_PM(),
			time : now.getTime()
		}
	}
	return getDate();
}
module.exports = date;