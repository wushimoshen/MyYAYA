let Cookie = {
    getItem(key) {
        var arr = document.cookie.split("; ");
        for (let i = 0; i < arr.length; i++) {
            let arrTemp = arr[i].split("=");
            if (arrTemp[0] == key) {
                return arrTemp[1];
            }
        }
    },
    setItem(key, value, day) {
        if (day) {
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = key + "=" + value + ";expires=" + date;
        } else {
            document.cookie = key + "=" + value;
        }
    },
    removeItem(key) {
        /* 设置当前Cookie数据的过期时间为前一天 */
        this.setItem(key, "", -1);
    },
    getKeys() {

        var arr = document.cookie.split("; ");
        var keys = [];
        for (let i = 0; i < arr.length; i++) {
            let arrTemp = arr[i].split("=");
            keys.push(arrTemp[0]);
        }
        return keys;
    },
    clear() {
        var keys = this.getKeys();
        keys.forEach(element => {
            this.setItem(element, "", -1);
        });
    }
}