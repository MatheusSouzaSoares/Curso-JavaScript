//referenciar o input
let input = document.querySelector('input[name=tarefa]');
//referenciar o botao
let botao = document.querySelector('#botao');
//referenciar a lista
let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function addTarefas() {
    //limpar a lista antes de apresentar
    lista.innerHTML = '';
    for (tarefa of tarefas) {
        //criando item na lista
        let itemLista =document.createElement('li');

        //add classes do item
        itemLista.setAttribute('class','list-group-item list-group-item-action');

        //add evento de click
        itemLista.onclick = function () {deletarTarefa(this);}

        //criar o texto para add
        let itemTexto = document.createTextNode(tarefa);
        
        //add o texto em  item da lista
        itemLista.appendChild(itemTexto);

        //add o item na lista
        lista.appendChild(itemLista);

        

    }
    
     
}

// apresentar dados nativos da lista
addTarefas();

//add função do botao
botao.onclick = function() {
    //add o input em uma nova tarefa
    let NovaTarefa = input.value;
    //teste se esta em branco
    if ( NovaTarefa != '' ) {
        //add a tarefa na lista
    tarefas.push(NovaTarefa);
    //escreve a lista na tela
    salvarDadosnoStorage();
    addTarefas();
    //deixa o input em branco novamente
    input.value = '';
    //limpar as msgs de erro
    removerSpan();
    salvarDadosnoStorage();
    }
    else {
        //limpar as msgs de erro
        removerSpan();
        //seleciona o card para inserir o erro
        let card = document.querySelector('.card');
        //cria um alerta de erro
        let span = document.createElement('span');
        span.setAttribute('class','alert alert-warning');
        //msg de erro
        let msg = document.createTextNode('O campo está em branco!')
        //add na lista 
        span.appendChild(msg);
        card.appendChild(span);
    }

}

function removerSpan()
{
    //seleciona o card que contem erros
    let spans = document.querySelectorAll('span');
    let card = document.querySelector('.card');
    //´percorre a lista de span deletando um por um
    for (let i=0; i<spans.length;i++) {
        card.removeChild(spans[i]);
    }
}
function deletarTarefa(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);
    salvarDadosnoStorage();
    addTarefas();
}

function salvarDadosnoStorage(){
    localStorage.setItem('tarefas',JSON.stringify(tarefas));
}