let fs = require('fs');
let inputData=fs.readFileSync('input.txt').toString();
function Node(letter, freq, used, father, code){
    //this ={};
    this.letter = letter; //не обизаны называться одинаково 
    this.freq = freq; //letter - свойство для вызова, inp_letter - для массива
    this.used = used;
    this.father = father;
    this.code = code;
    //return this
}
let alph = new Array();
let tree = new Array();
let i=0;
for (i=0; i<inputData.length; i++){
    alph[inputData.charAt(i)]=0;
}
for (i=0; i<inputData.length; i++){
    alph[inputData.charAt(i)]++;
}
for (i in alph){
    let n = new Node(i, alph[i], false, null, '');
    tree.push(n);
}
console.log(alph);
console.log(tree);  
n=new Node(
    tree[0].letter + tree[1].letter,
    tree[0].freq, tree[1].freq,
    false,
    null,
    '');
    tree.push(n);    
n1 = new Node('a', 5, false, null, '');
n2 = new Node ('b', 2, false, null, '');
n3 = new Node ('r', 2, false, null, '');
n4= new Node ('k', 1, false, null, '');
n5 = new Node ('d', 1, false, null, '');


