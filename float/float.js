function getBinaryString(inputData)
{
    let bin=[];
    inputData=inputData.toString().replace(/[^0-9,+.-]/g,"");
    let temp=inputData[0].toString();
    let twonumbers=Boolean(false);
    for(let i=1; i<inputData.length; i++)
    {
        if(inputData[i]=="-"||inputData[i]=="+")
        {
            twonumbers=true;
            bin[0]=temp;
            bin[1]=inputData[i];
            i++;
            temp="";
            if(inputData[i]=="-")
            {
                temp+="-";
                i++;
            }
        }
        temp+=inputData[i];
    }
    if(twonumbers)
        bin[2]=temp;
    else
        bin[0]=temp;
    if(bin[1]!=undefined)
    {
        bin[0]=Number(bin[0]).toString(2);
        bin[2]=Number(bin[2]).toString(2);
    }
    else
        bin[0]=Number(bin[0]).toString(2);
    return bin;
}

function getDecimalNumb(float)
{
    let numb=[];
    let binar=float[2];
    float[0]==0 ? numb="" : numb="-";
    let deg=parseInt(float[1], 2)-127;
    binar="1"+binar.toString().slice(0, deg)+"."+binar.toString().slice(deg);
    numb+=binar.toString();
    numb=numb.split(".");
    let tail = numb[1];
    numb=Number(parseInt(numb[0], 2));
    for(let i=1; i<tail.toString().length;i++) {
        let x=tail[i-1]*(1/Math.pow(2, i));
        float[0]==0 ? numb+=x : numb-=x;
    }
    numb=numb.toFixed(2);
    return numb;
}

function getFloat(number)
{
    let flt=[];
    number>0 ? flt[0]=0 : flt[0]=1;
    number=Math.abs(number);
    let k=0;
    if(Number(number.toString(10))>=1) {
        for (let i=1; i < number.toString().length; i++) {
            if (number.toString()[i] == ".")
                break;
            k++;
        }
        let tmp=Number(number)/(Math.pow(10, k));
        tmp=tmp.toString().substr(2);
        if(tmp.toString().length<24)
            tmp=tmp+("0".repeat(24-tmp.length));
        flt[2]=tmp;
        k=Number((k+127).toString(2));
        flt[1]=k;
    }
    else
    {
        for(let i=1; i<number.toString().length;i++){
            if(number.toString()[i]=="1")
                break;
            k++;
        }
        let tmp=Number(number)*(Math.pow(10, k));
        tmp=tmp.toString().substr(2);
        if(tmp.toString().length<24)
            tmp=tmp+("0".repeat(24-tmp.length));
        flt[2]=tmp;
        k=Number((127-k).toString(2));
        flt[1]=k;
    }
    if(flt[1].toString().length<8)
    {
        let temp="";
        temp+=(8-flt[1].toString().length)*"0";
        temp+=flt[1].toString();
        flt[1]=temp;
    }
    return flt;
}

function binaryAddition(a,b){
    let result = "",
        carry = 0;
    while(a || b || carry){
        let sum = +a.toString().slice(-1) + +b.toString().slice(-1) + carry;
        if( sum > 1 ){
            result = sum%2 + result;
            carry = 1;
        }
        else{
            result = sum + result;
            carry = 0;
        }
        a = a.toString().slice(0, -1);
        b = b.toString().slice(0, -1);
    }
    return result;
}

function binarySubtraction(a,b){
    let result = "",
        carry = 0;
    while(a || b){
        let sub = Number(a.toString().slice(-1)) - Number(b.toString().slice(-1)) + carry;
        if( sub < 0 ){
            result="1"+result;
            carry =-1;
        }
        else{
            result = sub.toString()+result;
            carry = 0;
        }
        a = a.toString().slice(0, -1);
        b = b.toString().slice(0, -1);
    }
    return result;
}

function operation(input)
{
    let greater="", less="";
    console.log("\x1b[32m Представление чисел в формате IEEE 754: ");
    let first=getFloat(input[0]);
    let second=getFloat(input[2]);
    console.log("Число номер один: "+first.join(" "));
    console.log("Число номер два: "+second.join(" "));
    let k=0;
    let secLess = new Boolean(false);
    Math.abs(Number(first[1])) > Math.abs(Number(second[1])) ? secLess = true : secLess = false;
    if (first[1].toString()!=second[1].toString()) {
        if (Number(first[1]) > Number(second[1])) {
            less = Number(second[1]);
            greater = Number(first[1]);
            second[1] = first[1];
        } else {
            greater = Number(second[1]);
            less = Number(first[1]);
            first[1] = second[1];
        }
        while (less.toString() != greater.toString()) {
            let one = "1";
            less = binaryAddition(less.toString(), one.toString());
            k++;
        }
    }
    if(secLess==true)
    {
        second[2]="1"+second[2].toString();
        second[2]="0".repeat(k)+second[2].toString();
        second[2]=second[2].slice(0, 25);
        first[2]="1"+first[2];
    }
    else
    {
        first[2]="1"+first[2].toString();
        first[2] = "0".repeat(k) + first[2].toString();
        first[2]=first[2].substr(0, 25);
        second[2]="1"+second[2].toString();
    }
    if((first[0]==0&&second[0]==0&&input[1]=="+")||(first[0]==1&&second[0]==1&&input[1]=="+")||(first[0]==1&&second[0]==0&&input[1]=="-"))
    {
        first[2]=binaryAddition(first[2].toString(), second[2].toString());
    }
    else if((first[0]==0&&second[0]==1&&input[1]=="+")||(first[0]==0&&second[0]==0&&input[1]=="-"))
    {
        if(+first[2]<+second[2])
        {
            let temp=first[2];
            first[2]=second[2];
            second[2]=temp;
            first[0]=1;
        }
        first[2]=binarySubtraction(first[2].toString(), second[2].toString());
        while(first[2].charAt(0).toString()=="0")
        {
            first[1]=binarySubtraction(first[1], "00000001");
            first[2]=first[2].substr(1)+"0";
        }
    }
    else if((first[0]==1&&second[0]==0&&input[1]=="+")||(first[0]==1&&second[0]==1&&input[1]=="-"))
    {
        if(+first[2]<+second[2])
        {
            let temp=first[2];
            first[2]=second[2];
            second[2]=temp;
            first[0]=1;
        }
        first[2]=binarySubtraction(first[2].toString(), second[2].toString());
        while(first[2].charAt(0).toString()=="0")
        {
            first[1]=binarySubtraction(first[1], "00000001");
            first[2]=first[2].substr(1)+"0";
        }
    }
    if(first[2].toString().length>24){
        first[1]=binaryAddition(first[1], first[2].slice(0, first[2].length-25));
        first[2]=first[2].slice(1, 25);
    }
    else{
        console.log("Что-то пошло не так");
        return;

    }
    return first;
}

let fs = require('fs');
let arg = process.argv;
let inputData=fs.readFileSync("data.txt").toString();
console.log("\x1b[32m Исходная строка: ", inputData)
let bin=getBinaryString(inputData);
if(bin[1]=="+"||bin[1]=="-"){
    console.log("\x1b[32m Ваше выражение: ", bin.join(" "));
    console.log("\x1b[35m--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--");
    let out = operation(bin);
    console.log("\x1b[35m--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--", );
    console.log("Ответ в формате IEEE 754: ", out.join(" "));
    console.log("\x1b[35m--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--", );
    console.log("Ответ в десятичном формате: ", getDecimalNumb(out));
}
else if(bin[1]==undefined)
{
    console.log("\x1b[32m Двоичное представление числа: ", Number(bin));
    console.log("\x1b[35m--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--");
    let float=getFloat(bin);
    console.log("\x1b[32m Представление числа в формате IEEE 754: ", float.join(" "));
    console.log("\x1b[35m--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--ʕ ᵔᴥᵔ ʔ--", );
    let numb=getDecimalNumb(float);
    console.log("\x1b[32m Само число: ", numb);
}
else{
    console.log("\x1b[31m Что-то пошло не так");
}
