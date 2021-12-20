function getShift1(template)
{
    let table = [];
    for (let i = 0; i < template.length - 1; i++)
        table[template.charAt(i)] = i + 1;

    return table;
}

function getShift2(t, shift2, rpr, m)
{
    for (let i=1; i<=m-1; i++) {
        for (let k = m - i - 1; k >= 2 - i - 1; k--) {
            let f = 0;
            if (k >= 0) {
                k1 = m - i;
                for (let j = k; j <= k + i - 1; j++) {
                    if (t[j] == t[k1]) {
                        k1++;
                    } else {
                        f = 1
                        break
                    }
                }
            }
            if (k <= 0) {
                k1 = m - i - k
                h = k1
                for (let j = 0; j < m - k1; j++) {
                    if (t[j] == t[h]) {
                        h++;
                    } else {
                        f = 1;
                        break
                    }
                }
            }
            if (k <= m - i && f == 0 && ((k >= 1 && t[k - 1] != t[m - i - 1]) || k < 1)) {
                rpr[i] = k + 1;
                break;
            }
            if (f == 1 && k <= m - i) {
                rpr[i] = 1 - i;
            }
        }
        shift2[i] = m - rpr[i] - i + 1;
    }
    return(shift2);
}

function compare(s, m, result)
{
    for (let k=0; k<=s.length-m; k++){
        let q=0, l=0;
        for (let i=k+m-1; i>=k; i--){
            q++;
            if (s[i]==t[m-q]){
                l++;
            }
            else{
                k+=shift2[l]-1;
                break;
            }
            if (l==m){
                result.push(k+1);
                if (m-shift1[s.charAt(i)]>shift2[l-1]){
                    k+=m-shift1[s.charAt(i)]-1;
                }
                else{
                    k+=shift2[l-1]-1;
                }
            }
        }
    }
    return(result);
}

let arg = process.argv;
let s = arg[2]; //string
let t = arg[3]; //template
let m=t.length;
let rpr=[];
let shift1=[];	//Shift1
let shift2=[];	//Shift2
let result =[];
shift2[0]=1;
rpr[0]=m;
//---------------STEP 1--------------------
shift1=getShift1(t);
console.log(shift1);
//---------------STEP 2--------------------
shift2=getShift2(t, shift2, rpr, m);
console.log(shift2);
//---------------STEP 3--------------------
result=compare(s, m, result);
//---------------ANSWER--------------------
result.length==0 ? console.log("No matches") : console.log("Matched ", result);