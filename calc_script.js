let a = '';
let b = '';
let sign = '';

const calc = document.querySelector('.calc');
const result = document.querySelector('#result');

/* 
result.addEventListener('input', event => {
    if (result.innerHTML.length > 9) {
        result.innerHTML = result.innerHTML.substr(0, 9);
    }
})
}); */

const numbs = ['1','2','3','4','5','6','7','8','9','0','.'];
const signs = ['/','*','+','-'];

calc.addEventListener('click', function(event) {
    if (!event.target.classList.contains('calc__btn')) return;

    const value = event.target.innerText;

    if (result.innerText == 0) {
    result.innerText = value;
    } else {
    result.innerText += value;
    }

    if (numbs.includes(value) && sign == '') {
        a += value;
    }

    if ((a !== 0 && a !== '') && (signs.includes(value))) {
        sign = value;
        result.innerText = value;
        
    }

    if ((a !==0 && sign !=='') && (numbs.includes(value))) {
        b += value;
        result.innerText = b;
        
    }

    if ((a !== 0 && a !=='') && (b !== '') && (sign !== '') && (value == '=')) {
        const res = (result.innerText = (eval(`${a} ${sign} ${b}`)));
        a = res;
        b = '';
        sign = '';

    }

    if ((a !== 0 && b == '') && (value === 'x2')) {
        const pow = result.innerText = Math.pow(a, 2);
        a = pow;
    }

    if ((a !== 0 && b == '') && (value === 'sq')) {
        Number(a);
        const kor = result.innerText = Math.sqrt(a);
        a = kor;
    }

    if ((result.innerText !== 0) && (value === 'del')) {
        result.innerText.slice(0, -1);
        result.innerText = value

    }
    

    if (value == 'C') {
        result.innerText = 0;
        a = '';
        b = ''; 
        sign = ''; 
    }

});



/* const calc = document.querySelector('.calc');

calc.addEventListener('click', function(event) {
    console.log(event.target);
})
 */

/*
let x = '';
let y = '';
let sign = '';
let finish = false;

const screen = document.querySelector('.numPlace')

const nums = ['0','1','2','3','4','5','6','7','8','9','.']
const signs = ['+','-','*','/']

function clearAll () {
    x = '';
    y = '';
    sign = '';
    finish = false;
    screen.textContent = 0;
}

document.querySelector('#ca').onclick = clearAll;

document.querySelector('.numPad').onclick = (event) => {
    if(!event.target.classList.contains('butomNum')) return;
    if(event.target.id.contains('ca')) return;

    screen.textContent;
    const key = event.target.textContent;

    if (nums.includes(key)) {
        a += key;
        screen = key;
        console.log(a, b, sign);
    }
}
*/