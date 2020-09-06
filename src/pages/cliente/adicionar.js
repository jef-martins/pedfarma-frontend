import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import Alerta from '../../components/alerta/alerta';

export default class Adicionar extends Component {

  constructor(props){
        super(props);

        this.state = {
            cliente: {
                id: '',
                nome: '',
                cpf: '',
                email: '',
            },
            status: false
        }; 
  }



    onSave = async () => {

        const response = await api.post('cliente/clientes', {
            cpf: this.state.cliente.cpf,
            nome: this.state.cliente.nome,
            email:this.state.cliente.email,
            endereco_id: 1
        });

        if(response.status === 200)
            this.setState({status: !this.state.status});
    }

  setCpf = (e) =>{
    this.state.cliente.cpf = e.target.value;
    this.setState(this.state);
  }

  setNome = (e) =>{
    this.state.cliente.nome = e.target.value;
    this.setState(this.state);
  }

  setEmail = (e) =>{
    this.state.cliente.email = e.target.value;
    this.setState(this.state);
  }

  render(){
        return(
            <>
                <div className="container">
                    {
                        this.state.status &&
                            <div className="row mt-3">
                                <div className='col-10 offset-1 text-center'>
                                    <Alerta tipo="success" texto="Transação Realizada com Sucesso!"/>
                                </div>
                            </div>
                    }
                    <div className='row'>
                       <div className='col-10 offset-1'>
                            <div className="mt-2 card shadow-sm">
                                <div className="card-header"> 
                                    <h5> Informações do Cliente </h5>
                                </div>
                                <div className="card-body">
                                    <div className='d-flex'>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="descricao"> Nome </label>
                                                <input type="text" onChange={this.setNome} className="form-control" value={this.state.cliente.nome}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="modelo"> CPF </label>
                                                <input type="text" onChange={this.setCpf} class="form-control" id="modelo" value={this.state.cliente.cpf}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="preco"> E-mail </label>
                                                <input type="text" onChange={this.setEmail} className="form-control" id="preco" value={this.state.cliente.email}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <button className='btn btn-success float-right' onClick={this.onSave}> Salvar </button>
                                    <Link className='btn btn-secondary float-left mr-2' to="/cliente"> Listar Produtos </Link>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </>
        );
    }
}
