
id_controlador  = 0;
produto         = {};

function inserir_produto(){
    if(!valida_campos()) return;
    recupera_infos();
    exibir_tabela();
    calcular_total_produtos();
    limpar_campos();
}

function valida_campos(){
    let spn_inserir = document.getElementById('spn_inserir');
    if (descricao.value == '' || valor.value == '' || quantidade.value == '') {
        spn_inserir.innerHTML = " Preencha todas as informações!";
        return false;
    } else {
        spn_inserir.innerHTML = '';
        return true;
    }
}

function recupera_infos(){
    produto[id_controlador]     = {
        descricao_produto:  document.getElementById('descricao').value,
        valor_produto:      document.getElementById('valor').value,
        quantidade_produto: document.getElementById('quantidade').value
    };
    id_controlador++;
    return produto;
}

function limpar_campos(){
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
}

function conteudo_tabela(){
    let conteudo_tabela = '';
    for (let index = 0; index <= id_controlador; index++) {
        if (produto[index]) {
            let descricao_produto   = "<td>"+produto[index]['descricao_produto']+"</td>";
            let valor_produto       = "<td>"+produto[index]['valor_produto']+"</td>";
            let quantidade_produto  = "<td>"+produto[index]['quantidade_produto']+"</td>";
            let total_quant_valor   = "<td>"+calcular_total_quantidade(index)+"</td>";
            let btn_remover         = "<td>"+spn_remover(index)+"</td>";
            let linha_tabela = "<tr>"+descricao_produto+valor_produto+quantidade_produto+total_quant_valor+btn_remover+"</tr>";
            conteudo_tabela = conteudo_tabela+linha_tabela;   
        } else{
            continue;
        }
    }
    return conteudo_tabela;
}

function exibir_tabela(){
    let tbody           = document.getElementById('tabela_body');
    tbody.innerHTML = conteudo_tabela();
}

function spn_remover(id){
    let spn_class   = "class='badge bg-danger' ";
    let spn_style   = "style='cursor: pointer' ";
    let spn_onclick = "onclick='remover_linha("+id+")'";
    let btn_remover = "<span "+spn_class+spn_style+spn_onclick+" >Remover</span>";
    return btn_remover;
}


function remover_linha(id){
    delete produto[id];
    exibir_tabela();
    calcular_total_produtos();
}

function calcular_total_quantidade(id){
    let valor_produto = '';
    let quant_produto = '';
    valor_produto = produto[id]['valor_produto'];
    valor_produto = valor_produto.replace(".", '');
    valor_produto = valor_produto.replace(",", '.');
    valor_produto = parseFloat(valor_produto);
    quant_produto = produto[id]['quantidade_produto'];
    quant_produto = parseInt(quant_produto);
    quant_valor   = valor_produto*quant_produto;
    quant_valor   = parseFloat(quant_valor);
    return quant_valor;
}

function calcular_total_produtos(){
    let total = 0;

    for (let index = 0; index <= id_controlador; index++) {
        if (produto[index]) {
            quant_valor   = calcular_total_quantidade(index);
            total         = parseFloat(total);
            total = total + quant_valor;
        }
    }
    document.getElementById('spn_total').innerHTML = total;
}

function somente_numeros(evento) {
    let input = document.getElementById('valor').value;
    var evento = evento || window.event;
    var key = evento.key;
    if (!((key >= 0 && key <= 9) || (key == '.' || key == ','))) {
        evento.returnValue = false;
    } else{
        if(key == '.' && input.indexOf(".") != -1){
            evento.returnValue = false;
        } else if (key == ',' && input.indexOf(",") != -1){
            evento.returnValue = false;
        }
    }
 }
 
 function limpar_tudo(){
    document.getElementById('tabela_body').innerHTML = '';
    limpar_campos();
    produto = {};
    id_controlador = 0;
    calcular_total_produtos();
 }