let arg = process.argv;
let string = arg[2].toString();
let output=0, count=0, j=0, stack=[],polishOut=[], priority =[],  num="";
priority["+"]=0;
priority["-"]=0;
priority["*"]=1;
priority["/"]=1;
priority["^"]=2;

for (let i=0; i<string.length; i++){
    if (isNaN(string[i])){
        if (string[i]==="("){
            if (string[i+1]==="-"){
                count++;
                i++;
                continue;
            }
            stack.push(string[i]);
            continue;
        }
        if (string[i]=="^"){
            stack.push(string[i]);
            continue;
        }
        if ((stack[stack.length-1]=="("|| priority[string[i]]<=priority[stack[stack.length-1]] || stack.length==0) && count!=1){
            while (priority[string[i]]<=priority[stack[stack.length-1]]) {
                polishOut.push(stack[stack.length - 1]);
                stack.pop();
            }
            stack.push(string[i]);
            continue;
        }
        if (priority[string[i]]>priority[stack[stack.length-1]]){
            stack.push(string[i]);
            continue;
        }
        if (string[i]==")"){
            if (count==1){
                continue;
            }
            while (stack[stack.length-1]!="("){
                polishOut.push(stack[stack.length-1]);
                stack.pop();
            }
            stack.pop();
            continue;
        }
    }
    else{
        num+=string[i];
        if (isNaN(string[i+1])){
            if (count==1){
                polishOut.push(Number(num)*(-1));
                count=0;
                i++;
            }
            else{
                polishOut.push(Number(num));
            }
            num="";
        }
    }

}
while (stack.length!=0){
    polishOut.push(stack[stack.length-1]);
    stack.pop();
}
console.log(polishOut);
while(polishOut.length!=1){
    if (isNaN(polishOut[j])){
        if (polishOut[j]=="+"){
            output=polishOut[j-1]+polishOut[j-2];
        }
        if (polishOut[j]=="-"){
            output=polishOut[j-2]-polishOut[j-1];
        }
        if (polishOut[j]=="*"){
            output=polishOut[j-1]*polishOut[j-2];
        }
        if (polishOut[j]=="/"){
            if (polishOut[j-1]=="0"){
                console.log("На нуль делить нельзя!");
                return;
            }
            output=polishOut[j-2]/polishOut[j-1];
        }
        if (polishOut[j]=="^"){
            output=Math.pow(polishOut[j-2], polishOut[j-1]);
        }
        polishOut.splice(j-2, 3, output)
        j-=2;
    }
    j++;
}
console.log(polishOut);