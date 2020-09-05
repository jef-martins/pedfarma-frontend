import React, { Component } from 'react';
import '../bootstrap.css';
import api from '../urls/apiCliente';
import {Link} from 'react-router-dom';
import SelecionarEndereco from '../classesEndereco/classeSelecionarEndereco';

class Cliente extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            respostas: [],
        }; 
    }
    async componentDidMount() {
        const response = await api.get('/'+this.state.id, this.state);
        this.setState({respostas: response.data });
        this.setState({status: response.status });
        this.setState({statusText: response.statusText });
    }
    render(){
        return (
            <div className="container">
                <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Cliente Nº {this.state.respostas.id}</div>
                    <div className="card-body">
                        <h5 className="card-title">Nome: {this.state.respostas.nome}</h5>
                        <p className="card-text"> CPF: {this.state.respostas.cpf}</p>
                        <p className="card-text"> E-mail: {this.state.respostas.email}</p>
                        <div className="card-text">{<SelecionarEndereco id={this.state.respostas.endereco_id}/>}</div>         
                        <Link className="btn btn-info mr-2" to={`/cliente/atualizar/${this.state.respostas.id}`}>Atualizar</Link>
                        <Link className="btn btn-danger" to={`/cliente/excluir/${this.state.respostas.id}`}>Excluir</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cliente;
