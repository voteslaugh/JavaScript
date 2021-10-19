let fs = require('fs');
let arg = process.argv;
let ram = [];
let i = 0;
ram=fs.readFileSync("input.crng").toString().split(/\s+/);
//console.log(ram);
while(true){
    if(ram[i]==="put"){
        ram[Number(ram[i+1])] = arg[Number(ram[i+1])%10+2]; //данные из консоли записываются в массив
        i=i+2;
    }
    if(ram[i]==="putin"){
        ram[Number(ram[i+1])]=Number(ram[i+2]);
        i=i+3;
    }
    if(ram[i]==="sum"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) + Number(ram[Number(ram[i+2])]);
        i=i+4;
    }
    if(ram[i]==="sub"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) - Number(ram[Number(ram[i+2])]);
        i=i+4;
    }
    if(ram[i]==="div"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) / Number(ram[Number(ram[i+2])]);
        i=i+4;
    }
    if(ram[i]==="div%"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) % Number(ram[Number(ram[i+2])]);
        i=i+4;
    }
    if(ram[i]==="mul"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) * Number(ram[Number(ram[i+2])]);
        i=i+4;
    }
    if(ram[i]==="goifbgr"){
        if (ram[Number(ram[i+1])] > ram[Number(ram[i+2])]-1){
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if(ram[i]==="goifless"){
        if (ram[Number(ram[i+1])] < ram[Number(ram[i+2])]-1){
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if(ram[i]==="goif!eq"){
        if (ram[Number(ram[i+1])]!=ram[Number(ram[i+2])]){
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if (ram[i]==="ascend"){
        if(Number(ram[Number(ram[i+1])]) > Number(ram[Number(ram[i+2])])){
            ram[205] = ram[Number(ram[i+2])];
            ram[Number(ram[i+2])] = ram[Number(ram[i+1])];
            ram[Number(ram[i+1])] = ram[205];
        }
        i=i+3;
    }
    if(ram[i]==="equals"){
        if (ram[Number(ram[i+1])]===ram[Number(ram[i+2])]) {
            ram[Number(ram[i + 3])] = 1;
        }
        else{
            ram[Number(ram[i + 3])] = 0;
        }
        i=i+4;
    }
    if(ram[i]==="output"){
        console.log(ram[Number(ram[i+1])]);
        i=i+2;
    }
    if(ram[i]==="exit"){
        break;
    }
}
