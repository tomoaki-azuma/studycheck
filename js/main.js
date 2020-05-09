new Vue({
    el: '#app',
    data: {
        courses: courses_json,
        selected_courses: [],
        name : '',
        checked_items: [],
        selected: '',
        data_details: data_details_json,
        target_items: [],
        target_course_title: '',
        taking_status: {}
    },
    methods: {
        regist_list: function(){
            localStorage.setItem("select_item", this.checked_items);
        },
        regist_name: function() {
            localStorage.setItem("name", this.name);
            this.change_name = !this.change_name;
        },
        get_selected_courses: function() {
            this.selected_courses = [];
            for (let v of this.courses['Courses']) {
                if (this.checked_items.includes(v['id'])) {
                    this.selected_courses.push(v);
                }
            }
        },
        get_title: function(id) {
            return this.courses['Courses'].filter(v => v['id'] === id)[0]['title'];
        },
        select_course: function() {
            if(localStorage.hasOwnProperty(`history${this.selected}`)) {
                tmp = this.get_history(`history${this.selected}`);
                this.target_items = tmp;
            } else {
                this.target_items = this.data_details.filter(v => v[0] === this.selected);
            }
            this.target_course_title = this.get_title(this.selected);
        },
        change_log: function(obj,idx) {
            let tmp = obj.slice();
            if (tmp[5] === '1') {
                tmp[5] = '0';
            } else {
                tmp[5] = '1';
            }
            this.$set(this.target_items, idx, tmp);
            localStorage.setItem(`history${obj[0]}`, this.target_items);
        },
        get_history: function(key) {
            let arystr = localStorage.getItem(key).split(',');
            let ret = [];
            for (i=0; i < arystr.length; i += 6){
                ret.push([arystr[i],arystr[i+1],arystr[i+2],arystr[i+3],arystr[i+4], arystr[i+5]]);
            }
            return ret;
        },
        get_course_title: function(code) {
            return this.courses['Services'].filter(v => v['code'] === code)[0]['title']
        },
        regist_name: function() {
            localStorage.setItem('name', this.name);
        }
    },
    created () {
        if(localStorage.hasOwnProperty('name')) {
            this.name = localStorage.getItem("name");
        } 

        if(localStorage.hasOwnProperty('select_item')) {
            this.checked_items = localStorage.getItem("select_item").split(',');
            this.get_selected_courses();
        } 
    }

})


$("#btn-dialog").on('click', function(){
    console.log('hoge')
    $('#result').removeClass('hidden');
})

