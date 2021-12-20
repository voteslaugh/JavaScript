let fs = require('fs');
let arg = process.argv;
let prog=arg[2];
if (prog=="code")
{
    let shift = arg[3];
    let text = fs.readFileSync("input.txt").toString();
    let out = "";
    for (let s = 0; s < text.length; s++) {
        if (text[s].match(/^([a-zA-Z]+)$/i)) {
            if ((text.charCodeAt(s) - shift < 97 && text.charCodeAt(s) >= 97) || (text.charCodeAt(s) - shift < 65 && text.charCodeAt(s) >= 65)) {
                out += String.fromCharCode(text.charCodeAt(s) + 26 - shift)
            } else {
                out += String.fromCharCode(text.charCodeAt(s) - shift)
            }
        } else {
            out += text[s];
        }
    }
    fs.writeFileSync('code.txt', out);
}
else if (prog=="decode")
{
    let text = fs.readFileSync("code.txt").toString();
    let string="", out="", count=0;
    let canonFreq=[];
    for (let i=0; i<text.length; i++){
        if(text[i].match(/^[a-z]+$/)) {
            string += text[i];
        }
    }
    string=string.toLowerCase();
    let alph = fs.readFileSync('alph.txt', 'utf8').split('\r\n');
    for (let i = 0; i < alph.length; i++) {
        let lett = alph[i].split(' ')[0];
        let freq = alph[i].split(' ')[1];
        canonFreq[lett.charCodeAt(0)] = parseFloat(freq);
    }
    let actAlph=[], actFreq=[];
    for (let i=0; i<string.length; i++) {
        actAlph[string.charCodeAt(i)] = 0;
    }
    for (let i=0; i<string.length; i++){
        actAlph[string.charCodeAt(i)]++;
        count++;
    }
    actAlph.forEach((item, index) => {
        actFreq[index] = Number(((actAlph[index] / count) * 100).toFixed(2));
    });
    let c =-1;
    let min=100005;
    for (let k=0; k<26; k++){
        let dif=0;
        let sum=0;
        actAlph.forEach((item, index) => {
            if (index+k>122){
                dif=actFreq[index]-canonFreq[index+k-26];
            }
            else {
                dif = actFreq[index] - canonFreq[index + k];
            }
            sum+=dif;
        });
        sum=Math.pow(sum, 2);
        if (sum<min){
            min=sum;
            c=k;
        }
    }
    let trans=[];
    actAlph.forEach((item, index) => {
        if (index+c<123) {
            trans[index] = index + c;
        }
        else{
            trans[index] = index + c-26;
        }
    });
    for (let i=0; i<text.length; i++){
        if(text[i].match(/^([a-zA-Z]+)$/i)) {
            if (text[i]==text[i].toLowerCase()) {
                out += String.fromCharCode(trans[text.charCodeAt(i)])
            }
            else{
                out += String.fromCharCode(trans[text.charCodeAt(i)+32]-32)
            }
        }
        else{
            out+=text[i];
        }
    }
    fs.writeFileSync('decode.txt', out);
}
else
    console.log("Некорректный запуск программы");