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
        tmp=tmp.toString().slice(2);
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
        tmp=tmp.toString().slice(2);
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

function halfAdder(a, b){
    const sum = xor(a,b);
    const carry = and(a,b);
    return [sum, carry];
}
function fullAdder(a, b, carry){
    halfAdd = halfAdder(a,b);
    const sum = xor(carry, halfAdd[0]);
    carry = and(carry, halfAdd[0]);
    carry = or(carry, halfAdd[1]);
    return [sum, carry];
}
function xor(a, b){return (a === b ? 0 : 1);}
function and(a, b){return a == 1 && b == 1 ? 1 : 0;}
function or(a, b){return (a || b);}
function binarySum(a, b){
    let sum = '';
    let carry = '';
    for(let i = a.length-1;i>=0; i--){
        if(i == a.length-1){
            const halfAdd1 = halfAdder(a[i],b[i]);
            sum = halfAdd1[0]+sum;
            carry = halfAdd1[1];
        }else{
            const fullAdd = fullAdder(a[i],b[i],carry);
            sum = fullAdd[0]+sum;
            carry = fullAdd[1];
        }
    }
    return carry ? carry + sum : sum;
}

function operation(input)
{

}
let fs = require('fs');
let arg = process.argv;
let inputData=fs.readFileSync("data.txt").toString();
inputData=getBinaryString(inputData);
let first=[];
let second=[];
if(inputData[1]!=undefined){
    first=getFloat(inputData[0]);
    second=getFloat(inputData[2]);
}
console.log(first);
console.log(second);
console.log(binarySum(first[2], second[2]));