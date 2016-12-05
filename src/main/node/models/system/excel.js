var g = require('node-g');
var path = require('path');
var config = require(paths.config);
var JE = require('json-xlsx');
var je = new JE({tmpDir: paths.tmpdir});
var date = require('date-format');

class Excel {
    constructor() {

    }

    src(arr) {
        this.data = this.format(arr)
        return this
    }

    format(arr) {
        let data = arr.map(seq => {
            return g.getValueArray(seq.get())
        })
        logger.log(data, 789)
        data.unshift(g.getKeyArray(arr[0].get()))
        return {
            data: data,
            name: config.get('sheetname')
        }
    }

    Fixtimezone(time) {
        return date.asString(config.get('timestamp'), new Date(time))
    }

    dest(fn) {
        je.write(this.data, (err, filepath) => {
            fn(path.basename(filepath, '.xlsx'))
        })
    }

    getFilepath(id) {
        return path.join(paths.tmpdir, id + '.xlsx')
    }
}

module.exports = new Excel;
