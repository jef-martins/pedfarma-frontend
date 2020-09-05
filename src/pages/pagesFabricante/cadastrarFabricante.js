import React, { Component }from 'react';
import '../bootstrap.css';
import CadastroFabricante from '../classesFabricante/classeCadastrarFabricante';    


class Fabricante extends Component{

  constructor(props){
      super(props);
      this.state = { 
        nome: '',
        st: 0,
        respostas: [] || '',
      }; 
      this.setDescricao = this.setDescricao.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  setDescricao(e){
    let valor = e.target.value;
    this.setState({nome: valor});
  }
  salvar(){
    this.setState({st: 1});
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Novo Fabricante{this.state.id}</div>
                    <div className="card-body">
                        {
                            this.state.st === 1 ?
                                <div>
                                    <CadastroFabricante id={this.props.match.params.id} nome={this.state.nome}/>
                                </div>
                            :
                            <div>
                                <input onChange={this.setDescricao} className="mb-3 form-control" value={this.state.descricao} placeholder="Digite o Fabricante"/>                
                                <button className="btn btn-info" onClick={this.salvar}>Salvar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Fabricante;





