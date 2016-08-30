$(function(){
    var home = new Page;
    var selected = 'selected';
    var _selected = '.selected';

    home.extend({
        init: function(){
            this.$dom = $(document);
            this.regTel = /^1\d{10}/;
            this.css = this.$dom.find('link.main');
        },

        enter: function(){
            this.code();
            this.bind({
                'click@.btn-submit': function(){
                    var msg;
                    var data = home.getFormData();

                    if(msg = home.check(data)){
                        return alert(msg);
                    };

                    home.post(data,
                        function(msg){
                            var num = Number(cookie.get('userRegSuccess') || 0);
                            cookie.set('userRegSuccess', ++num, { expires: 7*365, path: '/' });
                            home.reset();
                            alert('申请成功，请耐心等待客户经理联系您！');
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
                'touchend@.gender': function(){
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

            // PC <=> MOBILE
            window.onresize = this.detector;



            var inst = $('[data-remodal-id=modal]').remodal();

            inst.open()
        },

        detector: function(){
            if(window.innerWidth < 1000 && !home.css.hasClass('m')){
                console.log('Change to Mobile');
                home.css.addClass('m').attr('href', '/css/top/m.css');
            };
            if(window.innerWidth >= 1000 && home.css.hasClass('m')){
                console.log('Change to PC');
                home.css.removeClass('m').attr('href', '/css/top/home.css');
            };
            home.$dom.find('body').show();
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/api/apply',
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
            if(data.vcode !== this.vcode.code){
                return '验证码不正确';
            }
        },

        getFormData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.tel = this.pure(this.$dom.find('[name="telphone"]').val());
            data.gender = this.$dom.find('.gender.selected').attr('data-value');
            data.vcode = this.pure(this.$dom.find('[name="vcode"]').val());
            data.userguid = cookie.get('userId');
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
            home.code();
            this.$dom.find('[name="username"]').val('');
            this.$dom.find('[name="telphone"]').val('');
            this.$dom.find('[name="vcode"]').val('');
        }
    });

    home.reg();
});
