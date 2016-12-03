var config = require(paths.config);
var extend = require('aimee-extend');
var date = require('date-format');
var G = require('node-g').G;
var g = new G;

g.extend = g.extend || extend;
g.extend({
    today() {
        return new Date(date('yyyy-MM-dd 00:00:00'))
    },

    getStart() {
        return new Date('2016-08-14')
    },

    getCurrentDate(){
        return new Date()
    },

    getCurrentWeek() {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000*60*60*24;
        //减去的天数
        var minusDay = week != 0 ? week-1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime()-(minusDay*millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime()+(6*millisecond));
        monday = monday.getFullYear()+"-"+(monday.getMonth()+1)+"-"+monday.getDate();
        sunday = sunday.getFullYear()+"-"+(sunday.getMonth()+1)+"-"+sunday.getDate();
        //添加本周时间
        startStop.push(monday);//本周起始时间
        //添加本周最后一天时间
        startStop.push(sunday);//本周终止时间
        //返回
        // return startStop;
        return new Date(monday);
    },

    getCurrentMonth(){
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear,currentMonth,1);

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if(currentMonth == 11){
            currentYear++;
            currentMonth = 0;//就为
        }else{
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }

        //一天的毫秒数
        var millisecond = 1000*60*60*24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear,currentMonth,1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime()-millisecond);
        firstDay = firstDay.getFullYear()+"-"+(firstDay.getMonth()+1)+"-"+firstDay.getDate();
        lastDay = lastDay.getFullYear()+"-"+(lastDay.getMonth()+1)+"-"+lastDay.getDate();
        //添加至数组中返回
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回
        // return startStop;
        return new Date(firstDay);
    },

    // 返回时间集
    times() {
        return [
            // Today
            this.today(),
            // Week
            this.getCurrentWeek(),
            // Month
            this.getCurrentMonth(),
            // All
            this.getStart()
        ]
    },

    // 根据时间参数返回 today, week, month 的数据
    getTimeQuery(type) {
        let times = this.times()
        return {
            createdAt: {
                $gt: times[type || 0]
            }
        }
    },

    // 返回成功的数据
    retSuccess(arr) {
        return {
            code: 0,
            data: {
                list: arr
            }
        }
    },

    // 修正时区
    Fixtimezone(arr) {
        return arr.map(seq => {
            let item = seq.get()
            item.createdAt = date.asString(config.get('timestamp'), new Date(item.createdAt))
            return item
        })
    },

    // 判断时间是否是当天
    isToday(time) {
        return date('dd') === date('dd', new Date(time))
    }
})

module.exports = g;
