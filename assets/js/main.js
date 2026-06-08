const display = document.getElementById('display');
let expr = '';       
let justEval = false; 
function render(){ display.textContent = expr === '' ? '0' : expr; }

function input(v){
  if(display.textContent === 'Error'){ expr = ''; }
  if(justEval){
    if(/[0-9.√(]/.test(v.charAt(0))) expr = '';
    justEval = false;
  }
  expr += v;
  render();
}

function del(){ justEval = false; expr = expr.slice(0, -1); render(); }
function clearAll(){ expr = ''; justEval = false; render(); }

function negate(){
  if(expr.startsWith('-(') && expr.endsWith(')')) expr = expr.slice(2, -1);
  else if(expr !== '') expr = '-(' + expr + ')';
  justEval = false; render();
}

function equals(){
  if(expr === '') return;
  if(!/^[0-9+\-×÷().√²\s]*$/.test(expr)){
    display.textContent = 'Error'; expr = ''; return;
  }
  try{
    const js = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/√/g, 'Math.sqrt')
      .replace(/²/g, '**2');
    const result = Function('"use strict"; return (' + js + ')')();
    if(result === undefined || result === null || Number.isNaN(result) || !isFinite(result)){
      throw new Error('invalid');
    }
    expr = String(result);
    justEval = true;
    render();
  }catch(e){
    display.textContent = 'Error';
    expr = ''; justEval = false;
  }
}

document.querySelector('.grid').addEventListener('click', function(e){
  const b = e.target.closest('button');
  if(!b) return;
  if(b.dataset.val !== undefined){ input(b.dataset.val); return; }
  switch(b.dataset.action){
    case 'del':    del();      break;
    case 'clear':  clearAll(); break;
    case 'square': input('²'); break;
    case 'sqrt':   input('√('); break;
    case 'negate': negate();   break;
    case 'equals': equals();   break;
  }
});