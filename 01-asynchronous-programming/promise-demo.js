let promise = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if(Math.random() > 0.5) {
            resolve('Babaluga..');
        } else {
            reject('hujnja');
        }
    }, 2000);
});

console.log(promise);
promise.then((result) => {
    console.log(result);
}).catch((reason) => {
    console.log(reason);
});

