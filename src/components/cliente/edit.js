import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import Alerta from '../alerta/alerta';

export default class Edit extends Component {

  constructor(props){
        super(props);

        this.state = {
            cliente: {
                id: '',
                nome: '',
                cpf: '',
                email: '',
                endereco: {
                    id: '',
                    logradouro: '',
                    complemento: '',
                    cep: '',
                    bairro_id: ''
                }
            },
            enderecos: [],
            editing: false,
            status: false
        }; 
  }

  async componentDidMount() {
    let response = await api.get(`cliente/clientes/${this.props.id}`);
    let cliente = response.data;
    console.log(cliente);

    response = await api.get(`endereco/enderecos/${cliente.endereco_id}`);
    let endereco = response.data

    this.setState({
        cliente: {
            id: cliente.id,
            nome: cliente.nome,
            cpf: cliente.cpf,
            email: cliente.email,
            endereco: {
                id: endereco.id,
                logradouro: endereco.logradouro,
                complemento: endereco.complemento,
                cep: endereco.cep,
                bairro_id: endereco.bairro_id
            }
        }
    })
  }

    set_editing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    onSave = async () => {
        let cliente = this.state.cliente;

        const response = await api.put(`cliente/clientes/${cliente.id}`,  {
            cpf: cliente.cpf,
            nome: cliente.nome,
            email: cliente.email,
            endereco_id: cliente.endereco.id,
        });
        if(response.status === 200)
            this.setState({status: !this.state.status});
    }

  onEdit = async () => {
    this.set_editing();

    let response = await api.get('endereco/enderecos');
    this.setState({enderecos: response.data});

  }

  onDelete = async () => {

    let response = await api.delete(`cliente/clientes/${this.state.cliente.id}`);

    if(response.status === 200){
        this.setState({
            cliente: {
                id: '',
                nome: '',
                cpf: '',
                email: '',
                endereco: {
                    id: '',
                    logradouro: '',
                    complemento: '',
                    cep: '',
                    bairro_id: ''
                }
            }
        })
        this.setState({status: !this.state.status});
    }

  }

  setNome = (e) =>{
    this.state.cliente.nome = e.target.value;
    this.setState(this.state);
  }

  setCpf = (e) =>{
    this.state.cliente.cpf = e.target.value;
    this.setState(this.state);
  }

  setEmail = (e) =>{
    this.state.cliente.email = e.target.value;
    this.setState(this.state);
  }

  setEndereco = (e) =>{
    this.state.cliente.endereco.id = e.target.value;
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
                                    <Alerta tipo="success" texto="Transação Efetuada com Sucesso!"/>
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
                                        <div className='col-1'>
                                            <div className="form-group">
                                                <label htmlFor="id"> COD </label>
                                                <input type="text" disabled className="form-control" id="id" value={this.state.cliente.id}/>
                                            </div>
                                        </div>
                                        <div className='col-5'>
                                            <div className="form-group">
                                                <label htmlFor="descricao"> Nome </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setNome} className="form-control" value={this.state.cliente.nome}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className="form-group">
                                                <label htmlFor="modelo"> Cpf </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setCpf} className="form-control" id="modelo" value={this.state.cliente.cpf}/>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div className="form-group">
                                                <label htmlFor="preco"> E-mail </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setEmail} className="form-control" id="preco" value={this.state.cliente.email}/>
                                            </div>
                                        </div>
                                    </div>

                                    { <div className='d-flex'>
                                        <div className='col-2'>
                                            <div className="form-group">
                                                <label htmlFor="cep"> E-mail </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setCep} className="form-control" id="cep" value={this.state.cliente.cep}/>
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                            <div className="form-group">
                                                <label htmlFor="categoria"> Logradouro </label>
                                                {
                                                    !this.state.editing ?
                                                        <input type="text" disabled={!this.state.editing} className="form-control" id="categoria" value={this.state.cliente.endereco.logradouro}/>
                                                    :
                                                        <select className='form-control' onChange={this.setEndereco} >
                                                            {this.state.enderecos.map(
                                                                endereco => <option key={endereco.id} value={endereco.id} selected={(endereco.id === this.state.cliente.endereco.id)} > {endereco.logradouro} </option>
                                                            )}
                                                        </select>
                                                }
                                            </div>
                                        </div>
                                    </div> } 
                                    
                                    <hr/>
                                    {
                                        !this.state.editing ? 
                                            <>
                                                <button className='btn btn-primary float-right' disabled={this.state.status} onClick={this.onEdit}> Editar </button> 
                                                <button className='btn btn-danger float-right mr-2' disabled={this.state.status} onClick={this.onDelete}> Excluir </button> 
                                            </>
                                        : 
                                            <>
                                                
                                                <button className='btn btn-success float-right' onClick={this.onSave}> Salvar </button>
                                                <a className='btn btn-danger float-right mr-2' href={`/cliente/${this.props.id}`}> Cancelar </a>
                                            </>
                                    }
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



