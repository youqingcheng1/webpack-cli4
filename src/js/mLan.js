import '../css/mLan.css'
window.addEventListener('orientationchange',()=>{
    if (window.orientation === 180 || window.orientation == 0) {
        let type = '/activity/minishopping/404/m/'
        // window.location.href = window.location.href.replace(location.pathname, type);
        console.log(window.orientation)
    }
})
function mInitLan() {
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
        if ((window.orientation === 180 || window.orientation == 0) && href !== '/activity/minishopping/404/m/') {
            type = obj['orientation']
            window.location.href = window.location.href.replace(location.pathname, type);
        }
    }
}
mInitLan()