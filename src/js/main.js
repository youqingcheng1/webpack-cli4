import '../css/main.css'

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
        if (window.orientation === 90 || window.orientation == -90) {
            type = obj['landscape']
            window.location.href = window.location.href.replace(location.pathname, type);
        }
    }
}
mInitOri()