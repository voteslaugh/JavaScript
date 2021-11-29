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
    valT+=t.charCodeAt(i);
    valS+=s.charCodeAt(i);
}

let count;
for (let i=1; i<n-m+2; i++){
    if (i>1){
        valS = valS - s.charCodeAt(i-2) + s.charCodeAt(i+m-2);
    }
    if (valS===valT){
        count = 0;
        for (let j=i-1; j<i+m+1; j++){
            if (s[j]!==t[count]){
                break;
            }
            if (j===i+m-2){
                arr.push(i);
            }
            count++;
        }
    }

}
console.log(arr.join(', '));
time = performance.now() - time;
console.log('Время выполнения = ', time);