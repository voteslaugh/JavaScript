let fs = require('fs');
let inputData = (fs.readFileSync('input.txt')).toString();

let alph = new Array();
let tree = new Array();
let i, num1, num2 = 0;
let str = '';
console.log(Node);

function Node (_letter, freq, used, father, code){
    this.letter=_letter;
    this.freq=freq;
    this.used=used;
    this.father=father;
    this.code=code;
}

for (let i = 0; i < inputData.length; i++){ //открывается массив, записываются элементы
    if (alph[inputData.charAt(i)])
        alph[inputData.charAt(i)]++;
    else{
        alph[inputData.charAt(i)] = 1;
    }
}

for (i in alph){            //для каждого символа заводится "ветка"
    let n = new Node(i, alph[i], false, null, '');
    tree.push(n);
}

while (tree[tree.length-1].freq != inputData.length){
    min1=inputData.length;
    min2=inputData.length;
    for (i in tree){
        if (tree[i].freq<=min1 && tree[i].used==0){
            min1=tree[i].freq;
            num1=i;
        }
    }
    tree[num1].used=true;
    for (i in tree){
        if (tree[i].freq<=min2 && tree[i].used==0){
            min2=tree[i].freq;
            num2=i;
        }
    }
    tree[num2].used=true;

    n = new Node(tree[num1].letter+tree[num2].letter, tree[num1].freq+tree[num2].freq, 0, null, '');
    tree.push(n);
    tree[num1].used=true;
    tree[num2].used=true;
    tree[num1].father=tree.length-1;
    tree[num2].father=tree.length-1;
    let s=(tree[num1].letter).length;
    if (s>1){
        tree[num1].code='1';
        tree[num2].code='0';
    }
    else{
        tree[num1].code='0';
        tree[num2].code='1';
    }
}
for (i=tree.length-2; i!=-1; i--)
    tree[i].code=tree[tree[i].father].code+tree[i].code;

for (i=0; i<=inputData.length; i++){
    for (j=0; j<tree.length/2; j++){
        if (inputData[i]==tree[j].letter)
            str+=tree[j].code
    }
}

console.log(tree)
console.log(str)

//раскодировка

let finaltree='';
let p='';

for (i=0;i<=str.length; i++){  //перезапись дерева
    p+=str[i];
    for (j=0; j<tree.length/2; j++){
        if (p==tree[j].code){
            finaltree+=tree[j].letter
            p='';
        }
    }
}
console.log(finaltree);