let arg = process.argv;
let s = arg[2].toString();
let t = arg[3].toString();
let n = Number(s.length);
let m = Number(t.length);
let arr = [];

let valT = 0;
for (let i = 0; i < m; i++){
    valT+=t.charCodeAt(i);
}

let valS = 0;
for (let i = 0; i < m; i++){
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