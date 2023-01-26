import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js';

const app = {
    data(){
        return {
            site: 'https://vue3-course-api.hexschool.io/v2/',
            path: 'gwen-hexschool-class',
            products:[],
            tempProduct:{},
        }
    },
    methods:{
        checkLogin(){
            const url = `${this.site}api/user/check`;
            axios.post(url)
            .then((res)=>{
                this.getProducts();
            })
            .catch((err)=>{
                alert(err.data.message);
                window.location = 'login.html'
            })
        },
        getProducts(){
            const url = `${this.site}api/${this.path}/admin/products`;
            axios.get(url)
            .then((res)=>{
                this.products = res.data.products;
            })
            .catch((err)=>{
                alert(err.data.message);
            })
        },
        detailProduct(item){
            this.tempProduct = item;
        }
    },
    mounted(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)gwenCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}

createApp(app).mount('#app');
