import '@/css/style.css'
import '@/css/test.css'
import Test from './js/test.js';

const app = document.querySelector('#app')
var htmlStr = `
    <header class="header-section">头部</header>
    <div class="content-section">内容</div>
    <footer class="footer-section">底部</footer>
`
app.innerHTML = htmlStr;
Test();