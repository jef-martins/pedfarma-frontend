import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import Alerta from '../alerta/alerta';

export default class Edit extends Component {

  constructor(props){
        super(props);

        this.state = {
            fornecedor: {
                id: '',
                nome: '',
                cnpj: '',
            },
            editing: false,
            status: false
        }; 
  }

  async componentDidMount() {
    let response = await api.get(`fornecedor/fornecedores/${this.props.id}`);
    let fornecedor = response.data;

    this.setState({
        fornecedor: {
            id: fornecedor.id,
            nome: fornecedor.nome,
            cnpj: fornecedor.cnpj,
        }
    })
  }
  onEdit = async () => {
    this.set_editing();

  }

    set_editing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    onSave = async () => {
        let fornecedor = this.state.fornecedor;

        const response = await api.put(`fornecedor/fornecedores/${fornecedor.id}`,  {
            cnpj: fornecedor.cnpj,
            nome: fornecedor.nome,
            endereco_id: 1,
        });
        if(response.status === 200)
            this.setState({status: !this.state.status});
    }

  onDelete = async () => {

    let response = await api.delete(`fornecedor/fornecedores/${this.state.fornecedor.id}`);

    if(response.status === 200){
        this.setState({
            fornecedor: {
                id: '',
                nome: '',
                cnpj: '',
            }
        })
        this.setState({status: !this.state.status});
    }

  }

  setNome = (e) =>{
    this.state.fornecedor.nome = e.target.value;
    this.setState(this.state);
  }

  setCnpj = (e) =>{
    this.state.fornecedor.cnpj = e.target.value;
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
                                    <h5> Informações do Fornecedor </h5>
                                </div>
                                <div className="card-body">
                                    <div className='d-flex'>
                                        <div className='col-1'>
                                            <div class="form-group">
                                                <label for="id"> COD </label>
                                                <input type="text" disabled className="form-control" id="id" value={this.state.fornecedor.id}/>
                                            </div>
                                        </div>
                                        <div className='col-7'>
                                            <div class="form-group">
                                                <label for="descricao"> Nome </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setNome} class="form-control" value={this.state.fornecedor.nome}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="modelo"> Cnpj </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setCnpj} class="form-control" id="modelo" value={this.state.fornecedor.cnpj}/>
                                            </div>
                                        </div>
                                    </div>
                                    
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
                                                <a className='btn btn-danger float-right mr-2' href={`/fornecedor/${this.props.id}`}> Cancelar </a>
                                            </>
                                    }
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



