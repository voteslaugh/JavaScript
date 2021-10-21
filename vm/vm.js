let fs = require('fs');
let arg = process.argv;
let ram = [];
let i = 0;
let counter = 0;
ram=fs.readFileSync("nod.crng").toString().split(/\s+/);
//console.log(ram);
while(true){
    if(ram[i]==="put"){
        ram[Number(ram[i+1])] = arg[2+counter]; //данные из консоли записываются в массив
        i=i+2;
        counter++;
    }
    if(ram[i]==="putin"){
        ram[Number(ram[i+1])]=Number(ram[i+2]); //положить в ячейку определенное число
        i=i+3;
    }
    if(ram[i]==="sum"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) + Number(ram[Number(ram[i+2])]); //прибавить два числа и записать в ячейку
        i=i+4;
    }
    if(ram[i]==="sub"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) - Number(ram[Number(ram[i+2])]); //отнять два числа и записать в ячейку
        i=i+4;
    }
    if(ram[i]==="div"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) / Number(ram[Number(ram[i+2])]); //разделить два числа и записать в ячейку
        i=i+4;
    }
    if(ram[i]==="div%"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) % Number(ram[Number(ram[i+2])]); //найти остаток от деления двух чисел и записать в ячейнку
        i=i+4;
    }
    if(ram[i]==="mul"){
        ram[Number(ram[i+3])] = Number(ram[Number(ram[i+1])]) * Number(ram[Number(ram[i+2])]); // унможить два числа и записать в ячейку
        i=i+4;
    }
    if(ram[i]==="goifbgr"){
        if (ram[Number(ram[i+1])] > ram[Number(ram[i+2])]-1){ //перейти в определенную ячейку, если одно число больше другого
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if(ram[i]==="goifless"){
        if (ram[Number(ram[i+1])] < ram[Number(ram[i+2])]-1){ //перейти в определенную ячейку, если одно число меньше другого
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if(ram[i]==="goif!eq"){
        if (ram[Number(ram[i+1])]!=ram[Number(ram[i+2])]){ //перейти в определенную ячейку, если одно число отлично от другого
            i = Number(ram[i+3]);
        }
        else{
            i=i+4;
        }
    }
    if (ram[i]==="ascend"){
        if(Number(ram[Number(ram[i+1])]) > Number(ram[Number(ram[i+2])])){ //расположить два числа в ячейках по возрастанию
            ram[205] = ram[Number(ram[i+2])];
            ram[Number(ram[i+2])] = ram[Number(ram[i+1])];
            ram[Number(ram[i+1])] = ram[205];
        }
        i=i+3;
    }
    if(ram[i]==="equals"){
        if (ram[Number(ram[i+1])]===ram[Number(ram[i+2])]) { //true/false в определенную ячейку, если числа равны/не равны
            ram[Number(ram[i + 3])] = 1;
        }
        else{
            ram[Number(ram[i + 3])] = 0;
        }
        i=i+4;
    }
    if(ram[i]==="output"){
        console.log(ram[Number(ram[i+1])]); //вывод определенной ячейки
        i=i+2;
    }
    if(ram[i]==="exit"){ //выходит из программы
        break;
    }
}
