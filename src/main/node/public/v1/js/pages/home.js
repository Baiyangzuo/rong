$(function(){
    var selected = 'selected';
    var _selected = '.selected';

    function Home() {
        this.init.apply(this, arguments)
    }

    Home.prototype = {

        init: function() {
            this.$dom = $(document);
            this.regTel = /^1\d{10}/;
        },

        bind: function(events){
            var it = this;
            events = events || {};
            $.each(events, function(key, fn){
                var pair = key.split('@');
                var evts = pair[0].split(/,\s*/g);
                evts.forEach(function(type){
                    it.$dom.on(type, pair[1], fn);
                });
            });
        },

        isMobile: function(){
            location.href = '/m';
        },

        reg: function() {
            this.saveSourceId();
            this.enter();
        },

        enter: function() {
            var home = this;

            this.code();
            this.bind({
                // 提交基础信息
                'click@.btn-submit': function(){
                    var msg;
                    var data = home.getFormData();

                    if(msg = home.check(data)){
                        return alert(msg);
                    };

                    home.post(data,
                        function(msg){
                            console.log(msg)
                            var num = Number(cookie.get('userRegSuccess') || 0);
                            cookie.set('userRegSuccess', ++num, { expires: 7*365, path: '/' });
                            cookie.set('username', data.username, { expires: 7*365, path: '/' });
                            localStorage.user = JSON.stringify(data);
                            // home.reset();
                            location.href = '/apply?' +
                                            'username=' + data.username + '&' +
                                            'telphone=' + data.tel + '&' +
                                            'gender=' + data.gender + '&' +
                                            'sid=' + data.sid;
                        },
                        function(err){
                            console.log(err.status);
                            console.log(err.responseText);
                            alert('注册失败，请刷新再试一次');
                        }
                    );
                },
                'click@.gender': function(){
                    if(!$(this).hasClass(selected)){
                        $(this).addClass(selected)
                            .siblings(_selected).removeClass(selected);
                    }
                },
                'click@.vcode-img': function(){
                    home.code();
                },
                'keypress@[name="vcode"]': function(e){
                    if(e.keyCode === 13){
                        home.$dom.find('.btn-success').click();
                    };
                },
                'click@.apply': function(e){
                    var bm = home.$dom.find('body').hasClass('m');
                    var lm = home.$dom.find('link.main').hasClass('m');
                    if(lm || bm){
                        window.scrollTo(0, 1600);
                    }
                    else{
                        home.$dom.find('[name="username"]').focus();
                    };
                }
            });
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/api/apply?sid=' + this.getSourceId(),
                type: 'POST',
                data: data,
                success: succ,
                error: err
            });
        },

        check: function(data) {
            if(!data.username){
                return '请输入用户名';
            }
            if(!data.tel || !this.regTel.test(data.tel) || data.tel.length !== 11){
                return '请输入正确的手机号';
            }
            if(!data.gender){
                data.gender = 'male';
            }
            if(!data.vcode){
                return '请输入验证码';
            }
            if(data.vcode.toLowerCase() !== this.vcode.code){
                return '验证码不正确';
            }
        },

        getFormData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.tel = this.pure(this.$dom.find('[name="telphone"]').val());
            data.gender = this.$dom.find('.gender.selected').attr('data-value');
            data.vcode = this.pure(this.$dom.find('[name="vcode"]').val());
            data.sid = this.getSourceId();
            return data;
        },

        pure: function(string){
            string = string.replace(/-*/g, '');
            string = string.replace(/\s*/g, '');
            return string;
        },

        code: function(){
            this.vcode = vcode.create();
            this.$dom.find('.vcode-img').attr('src', this.vcode.dataURL);
        },

        reset: function(){
            this.code();
            // Base
            this.$dom.find('[name="username"]').val('');
            this.$dom.find('[name="telphone"]').val('');
            this.$dom.find('[name="vcode"]').val('');
        },

        getUrlArguments: function() {
            var args = {}, arr;
            if(location.search){
                arr = location.search.slice(1).split('&');
                arr.forEach(function(item){
                    var tmp = item.split('=');
                    args[tmp[0]] = tmp[1];
                    tmp = null;
                })
            }
            return args;
        },

        getSourceId: function(){
            return this.getUrlArguments().sid || cookie.get('sid') || 0;
        },

        saveSourceId: function(){
            var sid = this.getSourceId();
            !sid || cookie.set('sid', sid);
        }
    };

    new Home().reg();
});
