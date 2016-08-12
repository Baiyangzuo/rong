$(function(){
    var home = new Page;
    var selected = 'selected';
    var _selected = '.selected';

    home.extend({
        init: function(){
            this.$dom = $(document);
            this.regTel = /^1\d{10}/;
        },

        enter: function(){
            this.bind({
                'click@.btn-submit': function(){
                    var msg;
                    var data = home.getFormData();

                    if(msg = home.check(data)){
                        return alert(msg)
                    }

                    home.post(data,
                        function(msg){
                            console.log(msg);
                            let num = Number(cookie.get('userRegSuccess') || 0);
                            cookie.set('userRegSuccess', ++num, { expires: 7*365, path: '/' })
                        },
                        function(err){
                            console.log(err.status)
                            console.log(err.responseText)
                        }
                    )
                },
                'click@.gender': function(){
                    if(!$(this).hasClass(selected)){
                        $(this).addClass(selected)
                            .siblings(_selected).removeClass(selected)
                    }
                }
            })
        },

        post: function(data, succ, err) {
            $.ajax({
                url: '/api/apply',
                type: 'POST',
                data: data,
                success: succ,
                error: err
            })
        },

        check: function(data) {
            if(!data.username){
                return '请输入用户名'
            }
            if(!data.tel || !this.regTel.test(data.tel) || data.tel.length !== 11){
                return '请输入正确的手机号'
            }
            if(!data.gender){
                data.gender = 'male';
            }
        },

        getFormData: function(data) {
            data = {};
            data.username = this.pure(this.$dom.find('[name="username"]').val());
            data.tel = this.pure(this.$dom.find('[name="telphone"]').val());
            data.gender = this.$dom.find('.gender.selected').attr('data-value');
            data.userguid = cookie.get('userId');
            return data;
        },

        pure: function(string){
            string = string.replace(/-*/g, '');
            string = string.replace(/\s*/g, '');
            return string;
        }
    })
    
    home.reg();
});
