(function init_life_time() {
    function getAsideLifeTime() {
        let d = new Date();
        /* 当前时间戳 */
        let nowDate = +new Date();
        /* 今天开始时间戳 */
        let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
        /* 今天已经过去的时间 */
        let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
        /* 今天已经过去的时间比 */
        let todayPassHoursPercent = (todayPassHours / 24) * 100;
        if ($(`#dayProgress .date-text span`).html() != parseInt(todayPassHours)) $(`#dayProgress .date-text span`).html(parseInt(todayPassHours));
        $(`#dayProgress .progress .progress-bar`).css(`width`, `${todayPassHoursPercent.toFixed(2)}%`);
        if ($(`#dayProgress .progress .progress-bar`).html() != `${todayPassHoursPercent.toFixed(2)}%`) $(`#dayProgress .progress .progress-bar`).html(`${todayPassHoursPercent.toFixed(2)}%`);
        /* 当前周几 */
        let weekDay = d.getDay() == 0 ? 7 : d.getDay();
        let weekDayPassPercent = (weekDay / 7) * 100;
        if ($(`#weekProgress .date-text span`).html() != weekDay) $(`#weekProgress .date-text span`).html(weekDay);
        $(`#weekProgress .progress .progress-bar`).css(`width`, `${parseInt(weekDayPassPercent)}%`);
        if ($(`#weekProgress .progress .progress-bar`).html() != `${parseInt(weekDayPassPercent)}%`) $(`#weekProgress .progress .progress-bar`).html(`${parseInt(weekDayPassPercent)}%`);
        /* 月 */
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let monthAll = new Date(year, month, 0).getDate();
        let monthPassPercent = (date / monthAll) * 100;
        if ($(`#monthProgress .date-text span`).html() != date) $(`#monthProgress .date-text span`).html(date);
        $(`#monthProgress .progress .progress-bar`).css(`width`, `${parseInt(monthPassPercent)}%`);
        if ($(`#monthProgress .progress .progress-bar`).html() != `${parseInt(monthPassPercent)}%`) $(`#monthProgress .progress .progress-bar`).html(`${parseInt(monthPassPercent)}%`);
        /* 年 */
        let days = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 366 : 365;
        let feb = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28;
        let passed = 0;
        switch (month) {
            case 12: passed += 30;
            case 11: passed += 31;
            case 10: passed += 30;
            case 9: passed += 31;
            case 8: passed += 31;
            case 7: passed += 30;
            case 6: passed += 31;
            case 5: passed += 30;
            case 4: passed += 31;
            case 3: passed += feb;
            case 2: passed += 31;
            case 1: passed += date;
        }
        let remaining = days - passed;
        // let yearPass = (month / 12) * 100;
        let yearPass = (passed / days) * 100;
        if ($(`#yearProgress .date-text span:first-child`).html() != passed) $(`#yearProgress .date-text span:first-child`).html(passed);
        if ($(`#yearProgress .date-text span:last-child`).html() != remaining) $(`#yearProgress .date-text span:last-child`).html(remaining);
        $(`#yearProgress .progress .progress-bar`).css(`width`, `${parseInt(yearPass)}%`);
        if ($(`#yearProgress .progress .progress-bar`).html() != `${parseInt(yearPass)}%`) $(`#yearProgress .progress .progress-bar`).html(`${parseInt(yearPass)}%`);
    }
    setInterval(getAsideLifeTime, 1000);
})();

hour = new Date().getHours();
if (hour < 6) {
    var hello = "凌晨好";
} else if (hour < 9) {
    var hello = "早上好";
} else if (hour < 12) {
    var hello = "上午好";
} else if (hour < 14) {
    var hello = "中午好";
} else if (hour < 17) {
    var hello = "下午好";
} else if (hour < 19) {
    var hello = "傍晚好";
} else if (hour < 22) {
    var hello = "晚上好";
} else {
    var hello = "夜深了";
}