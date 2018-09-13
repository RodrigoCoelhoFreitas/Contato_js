

	window.onload = inicializar;
	
	function inicializar(){
		construtor();
		carregarEventos();
		load();
		mostrarContatos();
	}

	var listaContatos = new Contatos();
	var inputTextNome;
	var inputTextEmail;
	var arrayInputCheckBoxCores;
	var btNovoContato;
	var btSalvar;
	var tabelaContato;
	
	function construtor(){
		inputTextNome = $("#inome");
		inputTextEmail = $("#iemail");
		arrayInputCheckBoxCores = $("input[name=cores][type=checkbox]");
		btNovoContato = $("#adicionar");
		btSalvar = $("#salvar");
		
		tabelaContatos = $("#contatos-tabela");
	
	}
	
	function carregarEventos(){
        btNovoContato.bind("click", adicionarContato);      
        btSalvar.bind("click", save);
	}

	function limparCampos(){
		inputTextNome.val("");
		inputTextEmail.val("");
		arrayInputCheckBoxCores.prop("checked",false);
	}
	
	function load() {
		var json = "";

		if(localStorage.getItem("contatos")){
			json = localStorage.getItem("contatos");
			listaContatos.contatos = JSON.parse(json);
		}
	}
	
	function save() {
		var myJSON = "";
		myJSON = JSON.stringify(listaContatos.contatos);
		localStorage.setItem("contatos", myJSON);
		alert("Dados salvos com sucesso");
	}
	
	function mostrarContatos(){
		
		var textoTabela = "",textoCores="",cor="";
		
		for(var i in listaContatos.contatos){
			textoTabela +="<tr><td><input type='button' class='botao-delete' value='X' /></td><td>"
			+ listaContatos.contatos[i].nome+"</td><td>"+listaContatos.contatos[i].email+"</td><td>";
			
			for(var j = 0;j<listaContatos.contatos[i].cores.length;j++){
				if(listaContatos.contatos[i].cores[j].value == "azul"){
					cor = "blue";
				}else{
					cor = "red";
				}
				textoCores+="<div class='cores' style='background-color:"+cor+"'></div>"+listaContatos.contatos[i].cores[j].value+" ";
			}
			textoTabela+=textoCores+"</td></tr>";
			textoCores="";
			cor="";
		}
		tabelaContatos.html(textoTabela);
		 $(".botao-delete").bind("click", removerContato);
	}
	
	
	function adicionarContato() {
		if(listaContatos.findIndexContato(inputTextNome.val(),inputTextEmail.val())>-1){
			alert("Ja existe este contato!");
		}else{
			var cores = [];
			arrayInputCheckBoxCores.each(function(){
				if($(this)[0].checked){
					cores.push({id:$(this)[0].id,value:$(this)[0].value});
				}
			});
			listaContatos.addContato(new Contato(inputTextNome.val(),inputTextEmail.val(),cores));
			mostrarContatos();
			alert("Contato adicionado");
			limparCampos();
		}
	}
	
	function removerContato(input) {
		var objTR = $(this).parent().parent();
		objTR.remove();
		var nome = ""+objTR.children("td:nth-child(2)").text();
		var email = ""+objTR.children("td:nth-child(3)").text();
		listaContatos.removeContato(nome,email);
	}