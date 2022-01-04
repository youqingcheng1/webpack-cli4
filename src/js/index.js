import '../css/index.css'

function pcInit() {
    let obj = {
        orientation: '/activity/minishopping/404/m/',
        landscape: '/activity/minishopping/404/m/landscape/',
        pc: '/activity/minishopping/404/'
    }
    let type = ''
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        if (window.orientation === 180 || window.orientation == 0) {
            type = obj['orientation']
            console.log('竖屏')
        }
        if (window.orientation === 90 || window.orientation == -90) {
            type = obj['landscape']
            console.log('横屏')
        }
        window.location.href = window.location.href.replace(location.pathname, type);
    } else {
        type = obj['pc']
    }
    console.log(type);
}
pcInit()