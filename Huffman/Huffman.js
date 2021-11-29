let string='abrakadabra';
let tree = [];
let alph = [];
let num1, num2 = 0;
let str = '';
function Node (letter, freq, used, father, code){
    this.letter=letter;
    this.freq=freq;
    this.used=used;
    this.father=father;
    this.code=code;
}
console.log(Node);

for (let i=0; i<string.length;i++){
    alph[string.charAt(i)]=0;
}

for (let i=0; i<string.length;i++){
    alph[string.charAt(i)]++;
}

for (let i in alph){
    let n = new Node(i, alph[i], false, null, '');
    tree.push(n);
}

while (tree[tree.length-1].freq !== string.length){
    let min1=string.length;
    let min2=string.length;
    for (let i in tree){
        if (tree[i].freq<=min1 && tree[i].used==0){
            min1=tree[i].freq;
            num1=i;
        }
    }
    tree[num1].used=true;
    for (let i in tree){
        if (tree[i].freq<=min2 && tree[i].used===0){
            min2=tree[i].freq;
            num2=i;
        }
    }
    tree[num2].used=true;

    let n = new Node(tree[num1].letter+tree[num2].letter, tree[num1].freq+tree[num2].freq, 0, null, '');
    tree.push(n);
    tree[num1].father=tree.length-1;
    tree[num2].father=tree.length-1;
    let s=(tree[num1].letter).length;
    tree[num1].code='1';
    tree[num2].code='0';
}
for (let i=tree.length-2; i!==-1; i--) {
    tree[i].code=tree[tree[i].father].code+tree[i].code;
    if ((tree[i].letter).length===1)
        alph[tree[i].letter]=tree[i].code;
}

for (let i=0; i<string.length; i++)
    str+=alph[string[i]];

console.log(tree)
console.log(alph)
console.log(str)

let out='';
let p='';

for (let i=0;i<=str.length; i++){
    p+=str[i];
    for (let j in alph){
        if (p===alph[j]){
            out+=j
            p='';
        }
    }
}
console.log(out);