/**
 * Extends
 */

module.exports = {

    filter(data) {
        let safe = {}
        for(let key in data){
            if(this.Table[key] && key !== id)
                safe[key] = data[key]
        }
        return safe
    }
}
