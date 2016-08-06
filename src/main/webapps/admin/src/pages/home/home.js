/*!
 * home For Aimeejs
 * https://github.com/gavinning/aimee
 *
 * Aimee-page
 * Date: 2016-08-06
 */

import Page from 'page';
import template from 'home.jade';

class home extends Page {

    constructor() {
        super();
        this.name = 'home';
        this.template = template;
    }

    get ajaxconfig() {
        return {
            url: '/tmp/test.json',
            dataType: 'json'
        }
    }

    onload() {

    }

    prerender(data) {
        let Table = require('table')
        data = data || this.getData()

        this.exports('header')
        this.exports('header-bar')
        this.exports('breadcrumb')

        this.use({
            'table': app => {
                app.init(data.table).config({
                    length: 1
                })
            },
            'panel': app => {
                let panelData = {title: data.table.title};
                app.init(panelData).render('#lincoapp-oc-usertable');
                let tablePlace = app.find('.portlet-body');
                this.query('table').render(tablePlace);
            }
        })
    }

    postrender(data) {

    }

    enter() {

    }

    leave() {

    }
}

export default new home;
