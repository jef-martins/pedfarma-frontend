import React, { Component }from 'react';
import {Link} from 'react-router-dom';
import api from '../urls/apiCliente';
import '../bootstrap.css';



class AtualizarCliente extends Component{

  constructor(props){
      super(props);
      this.state = { 
        cpf: props.cpf || '',
        nome: props.nome || '',
        email: props.email || '',
        endereco_id: props.endereco_id || '',
        id: props.id || '',
        respostas: []
      }; 
  }

  async componentDidMount() { 
    console.log(this.state);
    const response = await api.put('/'+this.state.id, this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div className="container">
                    <div className="card-body">
                        <h5 className="card-title">Nome: {this.state.respostas.nome}</h5>
                        <p className="card-text"> CPF: {this.state.respostas.cpf}</p>
                        <p className="card-text"> E-mail: {this.state.respostas.email}</p> 
                        <p className="card-text"> Endereço: {this.state.respostas.endereco_id}</p> 
                    </div>
                    {
                        this.state.status < 400 ?
                            <div>
                                <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                            </div>
                        :
                            <div className="p-3 mb-2 mt-2 bg-danger text-white">{this.state.status} - {this.state.statusText}</div>
                    }
                    <Link className="btn btn-info" to={`/cliente`}>Listar Clientes</Link>
            </div>

        );
    }
}

export default AtualizarCliente;