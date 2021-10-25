let fs = require("fs");
let alph = new Array();
let arg = process.argv;
let inputData = fs.readFileSync(arg[2]).toString(); //записывает данные из файла в инпут дата

function Node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}
//инициализация алфавита
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] = 0;
}
for (let i = 0; i < inputData.length; i++) {
    alph[inputData.charAt(i)] += 1;
}

let tree = new Array();

for (c in alph) {
    let n = new Node(c, alph[c], false, null, '');
    tree.push(n);
}
trlng = tree.length;
for (let i = 0; i < trlng - 1; i++) {
    let min = inputData.length;
    let first;
    let second;
    for (let k = 0; k < tree.length; k++) {
        if (min > tree[k].freq && !tree[k].used) {
            min = tree[k].freq;
            first = k;
        }
    }
    tree[first].used = true;
    tree[first].father = tree.length;
    tree[first].code = '0';
    let trmin = inputData.length;
    for (let i = 0; i < tree.length; i++) {
        if (trmin > tree[i].freq && !tree[i].used) {
            trmin = tree[i].freq;
            second = i;
        }
    }

    tree[second].used = true;
    tree[second].father = tree.length;
    tree[second].code = '1';
    let n = new Node(tree[first].letter + tree[second].letter, tree[first].freq + tree[second].freq, false, null, '')
    tree.push(n);
}
let final = [];
for (let i = 0; i < trlng; i++) {
    let g = i;
    final[tree[g].letter] = '';
    while (tree[g].father != null) {
        final[tree[i].letter] = tree[g].code + final[tree[i].letter];
        g = tree[g].father;

    }
}
let str = ''; 
for (let i = 0; i < trlng; i++) {
    let j = inputData[i];
    str += final[j];


}
fs.writeFileSync(arg[3],str); //Записывает данные в файл