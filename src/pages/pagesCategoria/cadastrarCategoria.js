import React, { Component }from 'react';
import '../bootstrap.css';
import CadastroCategoria from '../classesCategoria/classeCadastrarCategoria';    


class Categoria extends Component{

  constructor(props){
      super(props);
      this.state = { 
        descricao: '',
        st: 0,
        respostas: [] || '',
      }; 
      this.setDescricao = this.setDescricao.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  setDescricao(e){
    let valor = e.target.value;
    this.setState({descricao: valor});
  }
  salvar(){
    this.setState({st: 1});
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Nova Categoria{this.state.id}</div>
                    <div className="card-body">
                        {
                            this.state.st === 1 ?
                                <div>
                                    <CadastroCategoria id={this.props.match.params.id} descricao={this.state.descricao}/>
                                </div>
                            :
                            <div>
                                <input onChange={this.setDescricao} className="mb-3 form-control" value={this.state.descricao} placeholder="Digite a Descrição"/>                
                                <button className="btn btn-info" onClick={this.salvar}>Salvar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Categoria;





