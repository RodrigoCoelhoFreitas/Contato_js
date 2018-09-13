

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
		inputTextNome = document.getElementById("inome");
		inputTextEmail = document.getElementById("iemail");
		arrayInputCheckBoxCores = document.getElementsByName("cores");
		
		btNovoContato = document.getElementById("adicionar");
		btSalvar = document.getElementById("salvar");
		
		tabelaContatos = document.getElementById("contatos-tabela");
	
	}
	
	function carregarEventos(){
		btNovoContato.addEventListener("click",adicionarContato,false);
		btSalvar.addEventListener("click",save,false);
	}

	function limparCampos(){
		inputTextNome.value = "";
		inputTextEmail.value = "";
		
		for(let checkBox of this.arrayInputCheckBoxCores){
			checkBox.checked = "";
		}
	}
	
	function load() {
		var json = "";

		if(localStorage.getItem("contatos")){
			json = localStorage.getItem("contatos");
			listaContatos.contatos = JSON.parse(json);
		}
	}
	
	function save(event) {
		event.preventDefault();
		var myJSON = "";
		myJSON = JSON.stringify(listaContatos.contatos);
		localStorage.setItem("contatos", myJSON);
		alert("Dados salvos com sucesso");
	}
	
	function mostrarContatos(){
		
		var textoTabela = "",textoCores="",cor="";
		
		for(var i in listaContatos.contatos){
			textoTabela +="<tr><td><input type='button' class='botao-delete' value='X' onClick='removerContato(this)' /></td><td>"
			+ listaContatos.contatos[i].nome+"</td><td>"+listaContatos.contatos[i].email+"</td><td>";
			
			console.log(listaContatos.contatos[i].cores.length);
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
		
		tabelaContatos.innerHTML = textoTabela;
	}
	
	
	function adicionarContato(event) {
		
		event.preventDefault();

		var nome = inputTextNome.value;
		var email = inputTextEmail.value;
		
		if(listaContatos.findIndexContato(nome,email)>-1){
			alert("Ja existe este contato!");
		}else{
			var cores = [];
			var vetor_cores = arrayInputCheckBoxCores;
			for(var i=0;i<vetor_cores.length;i++){
				if(vetor_cores[i].checked){
					var id = vetor_cores[i].id;
					var value = vetor_cores[i].value;
					var novo_campo ={"id":id,"value":value};
					cores.push(novo_campo);
				}
			
			}
			listaContatos.addContato(new Contato(nome,email,cores));
			mostrarContatos();
			alert("Contato adicionado");
			limparCampos();
		}
	}
	
	function removerContato(input) {
		var objTR = input.parentNode.parentNode;
		var objTable = objTR.parentNode.parentNode;
		var indexTR = objTR.rowIndex;
		objTable.deleteRow(indexTR);
		var nome = ""+objTR.cells[1].innerHTML;
		var email = ""+objTR.cells[2].innerHTML;
		listaContatos.removeContato(nome,email);
	}