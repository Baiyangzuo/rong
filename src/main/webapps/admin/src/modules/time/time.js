class Time {

    constructor(options) {
        this.Date = require('./lib/format');
        this.TIMESTAMP = "yyyy-MM-dd hh:mm:ss";
        this.options = options || { format: this.TIMESTAMP };
    }

    now(string) {
        return this.Date(string || this.options.format)
    }

    get(time, string) {
        return time instanceof Date ?
            this.Date(string || this.options.format, time):
            this.Date(string || this.options.format, time ? new Date(time) : new Date())
    }
}

let time = new Time;
Time.time = time;
Time.now = (s) => time.now(s);
// export default Time;
module.exports = Time;
