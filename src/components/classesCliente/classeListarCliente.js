import React, { Component }from 'react';
import {Link} from 'react-router-dom';
import api from '../urls/apiCliente';
import '../bootstrap.css';


class ListarCliente extends Component{

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
                <Link to="/cliente/cadastrar/add" type="button" className="mt-2 btn btn-outline-success btn-lg btn-block">Cadastrar Cliente</Link>
                <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                <div className="lista">
                    { this.state.respostas.map((resposta) => {
                        return(
                            <div key={resposta.id} className="mt-2 card text-white bg-dark mb-3">
                                <div className="card-header">Cliente Nº {resposta.id}</div>
                                <div className="card-body">
                                    <h5 className="card-title">Nome: {resposta.nome}</h5>
                                    <p className="card-text"> CPF: {resposta.cpf}</p>
                                    <p className="card-text"> Email: {resposta.email}</p>                            
                                    <Link className="btn btn-info" to={`/cliente/${resposta.id}`}>Selecionar</Link>   
                                </div>
                            </div> 
                        )
                    }) }
                </div>
            </div>
        );
    }
}

export default ListarCliente;