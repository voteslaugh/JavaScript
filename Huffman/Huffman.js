let fs = require('fs');
function Node(letter, freq, used, father, code){
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}
 
//данные из файла, перенесенные в строчные
let inputData = (fs.readFileSync('input.txt')).toString();
let alph = new Array();
 
//создание алфавита с подсчетом повторений
for (let i = 0; i < inputData.length; i++){
    if (alph[inputData.charAt(i)])
        alph[inputData.charAt(i)]++;
    else{
        alph[inputData.charAt(i)] = 1;
    }
}
//создание массива с узлами
let tree = new Array();
for (let i in alph)
{
    tree.push(new Node(i, alph[i]));
}
 
for (let i = 0; i < tree.length - 1; i++){
    //Поиск узлов с минимальным кол-вом включений
    let min1 = inputData.length;
    let min2 = inputData.length;
    let id1 = -1;
    let id2 = -1;
    for (let j = 0; j < tree.length; j++){
        if (tree[j].freq < min1 && !tree[j].used){
            min1 = tree[j].freq;
            id1 = j;
        }    
    }
 
    for (let j = 0; j < tree.length; j++){
        if (tree[j].freq < min2 && j != id1 && !tree[j].used){
            min2 = tree[j].freq;
            id2 = j;
        }    
    }
 
    if (id1 == -1 || id2 == -1){
        break;
    }
    //создание нового узла
    let newString = tree[id1].letter + tree[id2].letter;
    let newFreq = tree[id1].freq + tree[id2].freq;
    tree.push(new Node(newString, newFreq));
    //редактирование значений узлов
    tree[id2].used = true;
    tree[id1].used = true;
    tree[id1].father = tree.length - 1;
    tree[id2].father = tree.length - 1;
}
//получение кода
tree[tree.length - 1].code = '0';
tree[tree.length - 1].used = true;
for (let i = tree.length - 2; i >= 0; i--){
    if (tree[tree[i].father].used){
        tree[i].code = tree[tree[i].father].code + '1';
        tree[tree[i].father].used = false;
    }    
    else
        tree[i].code = tree[tree[i].father].code + '0';
 
}
//вывод дерева
console.log(tree);