import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import Alerta from '../../components/alerta/alerta';

export default class Adicionar extends Component {

  constructor(props){
        super(props);

        this.state = {
            fornecedor: {
                id: '',
                nome: '',
                cnpj: '',
            },
            status: false
        }; 
  }


    onSave = async () => {

        const response = await api.post('fornecedor/fornecedores', {
            cnpj: this.state.fornecedor.cnpj,
            nome: this.state.fornecedor.nome,
            endereco_id: 1
        });

        if(response.status === 200)
            this.setState({status: !this.state.status});
    }

  setCnpj = (e) =>{
    this.state.fornecedor.cnpj = e.target.value;
    this.setState(this.state);
  }

  setNome = (e) =>{
    this.state.fornecedor.nome = e.target.value;
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
                                    <h5> Informações do Fornecedor </h5>
                                </div>
                                <div className="card-body">
                                    <div className='d-flex'>
                                        <div className='col-8'>
                                            <div class="form-group">
                                                <label for="descricao"> Nome </label>
                                                <input type="text" onChange={this.setNome} className="form-control" value={this.state.fornecedor.nome}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="modelo"> CNPJ </label>
                                                <input type="text" onChange={this.setCnpj} class="form-control" id="modelo" value={this.state.fornecedor.cnpj}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <button className='btn btn-success float-right' disabled={this.state.status} onClick={this.onSave}> Salvar </button>
                                    <Link className='btn btn-secondary float-left mr-2' to="/fornecedor"> Listar Produtos </Link>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </>
        );
    }
}
