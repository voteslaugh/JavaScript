const { PerformanceObserver, performance } = require('perf_hooks');
let fs = require('fs');
let time = performance.now();
let arg = process.argv;
let s = fs.readFileSync(arg[2],'utf8').toString();
let t = fs.readFileSync(arg[3],'utf8').toString();
let n = Number(s.length);
let m = Number(t.length);
let arr = [];

let valT = 0;
let valS = 0;
for (let i = 0; i < m; i++){
    valT+=t.charCodeAt(i)*(Math.pow(2,m-i-1));
    valS+=s.charCodeAt(i)*(Math.pow(2,m-i-1));;
}

let i=1;
while (i<=n-m+1) {
    if (valT === valS) {
        let j = 0;
        while (s.charAt(i-1+j) === t.charAt(j)){
            j++
            if (j === m){
                arr.push(i);
                break;
            }
        }
    }
    valS = (valS - s.charCodeAt(i-1)*(Math.pow(2,m-1)))*2 + s.charCodeAt(i-1+m) ;
    i++;
}
console.log(arr.join(', '));
time = performance.now() - time;
console.log('Время выполнения = ', time);