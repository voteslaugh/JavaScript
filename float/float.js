function getBinaryString(inputData)
{
    let bin=[];
    inputData=inputData.replace(/[^0-9,+.-]/g,"");
    let temp=inputData[0];
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
    float[0]==0 ? numb=1 : numb=-1;
    let deg=parseInt(float[1], 2)-127;
    binar="1"+binar.slice(0, deg)+"."+binar.slice(deg);
    console.log(binar);
    numb=binar.split(".");
    let tail = numb[1];
    console.log(numb);
    numb=Number(parseInt(binar, 2));
    for(let i=1; i<tail.toString().length;i++) {
        let x=tail[i-1]*(1/Math.pow(2, i));
        numb += x;
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
        //console.log(tmp);
        tmp=tmp.toString().substr(2);
        //console.log(tmp);
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
       //console.log(tmp);
        tmp=tmp.toString().substr(2);
        //console.log(tmp);
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
        a = a.toString().slice(0, -1)
        b = b.toString().slice(0, -1)
    }
    return result;
}
function operation(input)
{
    let greater="", less="";
    console.log(input[0]);
    let first=getFloat(input[0]);
    console.log(first);
    let second=getFloat(input[2]);
    console.log(second);
    let k=0;
    let secLess = new Boolean(false);
    Number(first[1]) > Number(second[1]) ? secLess = true : secLess = false;
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
        second[2]="1"+second[2];
        second[2]="0".repeat(k)+second[2].toString();
        second[2]=second[2].slice(0, 25);
        first[2]="1"+first[2];
    }
    else
    {
        first[2]="1"+first[2];
        first[2] = "0".repeat(k) + first[2].toString();
        first[2]=first[2].substr(0, 25);
        second[2]="1"+second[2];
    }
    if((first[0]==0&&second[0]==0&&input[1]=="+")||(first[0]==0&&second[0]==1&&input[1]=="-"))
    {
        //console.log(first[2]);
       // console.log(second[2]);
        first[2]=binaryAddition(first[2].toString(), second[2].toString());
        //console.log(first[2]);
        //first[2]=first[2].substr(1);
        //console.log(first[2]);
        if(first[2].toString().length>24){
            first[1]=binaryAddition(first[1], first[2].slice(0, first[2].length-25));
            first[2]=first[2].slice(1, 25);
        }
    }
    else
    {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    return first;
}
let fs = require('fs');
let arg = process.argv;
let inputData=fs.readFileSync("data.txt").toString();
inputData=getBinaryString(inputData);
let out;
if(inputData[1]=="+"||inputData[1]=="-"){
    out=operation(inputData);
    console.log(out);
    console.log(out);
    console.log(getDecimalNumb(out));
}
