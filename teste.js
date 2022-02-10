const array_alunos = [];
const array_nome_alunos = document.querySelectorAll(".alunos");
function verificar_situacao(){
    const caminho_btn_media_geral = document.querySelector('#btn_media_geral')
    array_alunos.length = 0;
    var array_valores_notas = [];
    for(let i = 1; i <= array_nome_alunos.length; i++){
        const array_notas_alunos = document.querySelectorAll(`.notas${i}`);
        array_notas_alunos.forEach((tag)=>{array_valores_notas.push(tag.value)});
        const soma_notas = array_valores_notas.reduce((acumulador,valorAtual)=>acumulador+Number(valorAtual),0);
        array_alunos.push({nome:array_nome_alunos[i-1].value, notas_brutas:array_valores_notas , nota:soma_notas/4});
        array_valores_notas = [];
        res_na_tela(i-1,array_alunos);
    };
    caminho_btn_media_geral.disabled=false;
    document.querySelector("#crescente").disabled=false;
    document.querySelector("#decrescente").disabled=false;
    document.querySelector('#aufabetica').disabled=false;
};
function res_na_tela(pos_aluno,lista_alunos){
    const caminho_situacao = document.querySelector(`#situacao_aluno${pos_aluno + 1}`);
    const nota_aluno = lista_alunos[pos_aluno].nota;
    if(nota_aluno < 6 && nota_aluno != ''){
        var res = `O aluno ${array_alunos[pos_aluno].nome} obteve a média ${nota_aluno}, sendo assim Reprovado!`;
    }else{
        res = `O aluno ${array_alunos[pos_aluno].nome} obteve a média ${nota_aluno}, sendo assim Aprovado!!!`;
    }
    caminho_situacao.innerHTML = res;
};
function novo_aluno(){
    const caminho_nome = document.querySelector("#nomes");
    const caminho_notas = document.querySelector("#guarda_notas");
    const caminho_situacao = document.querySelector("#campo_situacao");
    var num_alunos = document.querySelectorAll(".alunos").length;
    const nome_aluno = criar_elemento("input",'text','','alunos', `Aluno ${num_alunos+1}`,'');
    caminho_nome.appendChild(nome_aluno);
    const div_notas = criar_elemento('div','',`aluno${num_alunos + 1}`,'col-md-12,bloco_nota','','');
    caminho_notas.appendChild(div_notas);
    const caminho_div_notas = document.querySelector(`div#aluno${num_alunos+1}`);
    for(let i = 0; i < 4; i++){
        const elemento = criar_elemento('input','number', '', `notas${num_alunos+1}`,`Insira a ${i+1}ª nota`,'');
        caminho_div_notas.appendChild(elemento);
    }
    const situacao_aluno = criar_elemento("p", "",`situacao_aluno${num_alunos+1}`,'situacao','',`Situação ${num_alunos+1}`);
    caminho_situacao.appendChild(situacao_aluno);
};
function criar_elemento(tag,tipo='',id='',classe,placeholder='',conteudo=''){
    const elemento = document.createElement(tag);
    if(tipo != ''){
        elemento.setAttribute("type",tipo);
    };
    if(id != ''){
        elemento.setAttribute("id",id);
    };
    if(conteudo != ''){
        elemento.innerHTML = conteudo;        
    };
    if(classe != ''){
        const array_classes = classe.split(',')
        array_classes.forEach((nome_classe)=> elemento.setAttribute("class",nome_classe));
    }
    elemento.setAttribute("placeholder",placeholder);
    return elemento;
};
function add_notas(){
    const num_alunos = document.querySelectorAll(".alunos").length;
    const caminho_guia = document.querySelectorAll('.notas1').length;
    for(let i = 0; i < num_alunos;i++){
        const caminho_notas_dinamicas = document.querySelector(`#aluno${i+1}`);
        const input_number = criar_elemento('input','number','',`notas${i+1}`,`Insira a ${caminho_guia+1}ª nota`,'')
        caminho_notas_dinamicas.appendChild(input_number);
    };
};
function repeticao_novo_aluno(){
    const caminho_qtd_aluno = document.querySelector('#qtd_alunos');
    const quantidade_repeticao = caminho_qtd_aluno.value;
    if(quantidade_repeticao != ''){
        for(let i = 0; i < quantidade_repeticao; i++){
            novo_aluno();
        };
    }else{
        novo_aluno();
    };
};
function repeticao_novas_notas(){
    const caminho_qtd_notas = document.querySelector('#qtd_notas');
    const quantidade_repeticao = caminho_qtd_notas.value;
    if(quantidade_repeticao != ''){
        for(let i = 0; i < quantidade_repeticao; i ++){
            add_notas();
        };
    }else{
        add_notas();
    };
};
function calcula_media_geral(){
    const caminho_div_media_geral = document.querySelector('.res_media_geral');
    const array_medias = array_alunos.map(({nota})=>{return nota});
    const soma_medias = array_medias.reduce((ac,pv)=>ac+pv);
    const resp = soma_medias/array_alunos.length;
    caminho_div_media_geral.innerHTML = `<p>${resp}</p>`;
};
function ordem_crescente(){
    const result = array_alunos.sort((a,b)=>b.nota - a.nota);
    //  caminhos:
    const caminho_alunos = document.querySelectorAll('.alunos');
    caminho_alunos.forEach((tag,index)=>{tag.value = result[index].nome;})
    const guia_notas = result[0].notas_brutas.length;
    for(let i = 0; i < array_alunos.length; i++){
        const caminho_notasX = document.querySelectorAll(`.notas${i+1}`);
        caminho_notasX.forEach((tag,index)=>{
            tag.value = result[i].notas_brutas[index];
        })
        res_na_tela(i,result);
    };
};
function ordem_decrescente(){
    const result = array_alunos.sort((a,b)=>a.nota - b.nota);
    //  caminhos:
    const caminho_alunos = document.querySelectorAll('.alunos');
    caminho_alunos.forEach((tag,index)=>{tag.value = result[index].nome;})
    const guia_notas = result[0].notas_brutas.length;
    for(let i = 0; i < array_alunos.length; i++){
        const caminho_notasX = document.querySelectorAll(`.notas${i+1}`);
        caminho_notasX.forEach((tag,index)=>{
            tag.value = result[i].notas_brutas[index];
        })
        res_na_tela(i,result);
    };
}   
function apaga_nota(){
    for(let i = 0; i < array_nome_alunos.length; i++){
        const caminho_div_notas = document.querySelector(`#aluno${i+1}`);
        const linhas_notas = document.querySelectorAll(`.notas${i+1}`)
        caminho_div_notas.removeChild(linhas_notas[linhas_notas.length-1]);
    }
    array_alunos.forEach((alunos)=>{
        var array_notas = alunos.notas_brutas;
        array_notas = array_alunos.pop();
        alunos.notas_brutas = array_notas;
    })
    console.log(array_alunos);
}
function apaga_aluno(){
    // tags_pai
    const caminho_guarda_nomes = document.querySelector("#nomes");
    const caminho_guarda_notas = document.querySelector("#guarda_notas");
    const caminho_guarda_situacoes = document.querySelector("#campo_situacao");

    const nome_alunos = document.querySelectorAll(".alunos");
    const bloco_notas = document.querySelectorAll(".bloco_nota");
    const situacoes =  document.querySelectorAll(".situacao");

    caminho_guarda_nomes.removeChild(nome_alunos[nome_alunos.length - 1]);
    caminho_guarda_notas.removeChild(bloco_notas[bloco_notas.length - 1]);
    caminho_guarda_situacoes.removeChild(situacoes[situacoes.length - 1]);
    
    console.log(bloco_notas);
    console.log(situacoes);
    
    array_alunos.pop();
}
function nome_aufabetica(){
    const result = array_alunos.sort((a,b)=>{
        if( b.nome > a.nome){
            return -1
        }
        else{
            return true
        }    
    });
    console.log(result)
    //  caminhos:
    const caminho_alunos = document.querySelectorAll('.alunos');
    caminho_alunos.forEach((tag,index)=>{tag.value = result[index].nome;})
    const guia_notas = result[0].notas_brutas.length;
    for(let i = 0; i < array_alunos.length; i++){
        const caminho_notasX = document.querySelectorAll(`.notas${i+1}`);
        caminho_notasX.forEach((tag,index)=>{
            tag.value = result[i].notas_brutas[index];
        })
        res_na_tela(i,result);
    }
};