class Contatos {
	
	constructor(){
		this.contatos = [];
	}
	
	findIndexContato(argNome,argEmail){
		for(var i in this.contatos){
			if(this.contatos[i].nome == argNome  && this.contatos[i].email == argEmail){
				return i;
			}
		}
		return -1;
	}
	
	addContato(contato){
		this.contatos.push(contato);
	}
	
	removeContato(argNome,argEmail){
		var index = this.findIndexContato(argNome,argEmail);
		if(index <0) return;
		this.contatos.splice(index,1);
	}
	
	getContato(argNome,argEmail){
		var index = this.findIndexContato(argNome,argEmail);
		if(index <0) return;
		return this.contatos[index];
	}
}