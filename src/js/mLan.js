import '../css/mLan.css'
function mInitLan() {
    let obj = {
        orientation: '/404/m/',
        landscape: '/404/m/landscape/',
        pc: '/404/'
    }
    let type = ''
    if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        type = obj['pc']
        window.location.href = window.location.href.replace(location.pathname, type);
    } else {
        if (window.orientation === 180 || window.orientation == 0) {
            type = obj['orientation']
            window.location.href = window.location.href.replace(location.pathname, type);
        }
    }
}
mInitLan()