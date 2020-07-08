const formatedMoney = (clp = "") => {
    return `${clp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const formatedDate = (date) => {
    date = new Date(date);
    let dd = date.getDate();
        dd = dd < 10 ? '0'+dd : dd;
    let mm = date.getMonth() + 1;
        mm = mm < 10 ? '0'+mm : mm;
    let hh = date.getHours();
        hh = hh < 10 ? '0'+hh : hh;
    let mnt = date.getMinutes();
        mnt = mnt < 10 ? '0'+mnt : mnt;
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy} ${hh}:${mnt}`;
};

const cutText = (text,maxLength = 25) => {
    if(typeof text != "undefined"){
        if(text.length > maxLength){
            return `${text.slice(0, maxLength)}...`;
        } else{
            return text
        }
    }
}

export{
    formatedMoney,
    formatedDate,
    cutText
}