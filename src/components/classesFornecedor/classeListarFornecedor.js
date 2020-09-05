import React, { Component }from 'react';
import {Link} from 'react-router-dom';
import api from '../urls/apiFornecedor';
import '../bootstrap.css';


class ListarFornecedor extends Component{

  constructor(props){
      super(props);
      this.state = { 
        respostas: [] || '',
      }; 
  }

  async componentDidMount() {

    const response = await api.get('', this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div className="container">
                <Link to="/fornecedor/cadastrar/add" type="button" className="mt-2 btn btn-outline-success btn-lg btn-block">Cadastrar Fornecedor</Link>
                <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                <div className="lista">
                    { this.state.respostas.map((resposta) => {
                        return(
                            <div key={resposta.id} className="mt-2 card text-white bg-dark mb-3">
                                <div className="card-header">Fornecedor Nº {resposta.id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Nome: {resposta.nome}</h5>
                                    <p className="card-text"> CNPJ: {resposta.cnpj}</p>                          
                                    <Link className="btn btn-info" to={`/fornecedor/${resposta.id}`}>Selecionar</Link>   
                                </div>
                            </div> 
                        )
                    }) }
                </div>
            </div>
        );
    }
}

export default ListarFornecedor;