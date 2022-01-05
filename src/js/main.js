import '../css/main.css'
window.addEventListener('orientationchange',()=>{
    if (window.orientation === 90 || window.orientation == -90) {
        let type = '/activity/minishopping/404/m/landscape/'
        window.location.href = window.location.href.replace(location.pathname, type);
        console.log(window.orientation)
    }
})
function mInitOri() {
    let obj = {
        orientation: '/activity/minishopping/404/m/',
        landscape: '/activity/minishopping/404/m/landscape/',
        pc: '/activity/minishopping/404/'
    }
    let type = ''
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        type = obj['pc']
        window.location.href = window.location.href.replace(location.pathname, type);
    } else {
        let href = location.pathname;
        if ((window.orientation === 90 || window.orientation == -90) && href !== '/activity/minishopping/404/m/landscape/') {
            type = obj['landscape']
            window.location.href = window.location.href.replace(location.pathname, type);
        }
    }
}
mInitOri()