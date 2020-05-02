function time(now) {
    var date = new Date(now * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 + "-").padStart(2, "0")
    var D = (date.getDate() + ' ').padStart(2, "0");
    var h = (date.getHours() + ':').padStart(3, "0");
    var m = (date.getMinutes() + ':').padStart(3, "0");
    var s = (date.getSeconds() + "").padStart(2, "0");
    return Y + M + D + h + m + s;
}
export default time