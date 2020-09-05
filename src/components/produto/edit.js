import React, { Component } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import Alerta from '../alerta/alerta';

class Edit extends Component {

  constructor(props){
        super(props);

        this.state = {
            produto: {
                id: '',
                descricao: '',
                modelo: '',
                preco: '',
                fabricante: {
                    id: '',
                    nome: ''
                },
                categoria: {
                    id: '',
                    descricao: ''
                }
            },
            fabricantes: [],
            categorias: [],
            editing: false,
            status: false
        }; 
  }

  async componentDidMount() {
    let response = await api.get(`produto/produtos/${this.props.id}`);
    let produto = response.data;

    response = await api.get(`fabricante/fabricantes/${produto.fabricante_id}`);
    let fabricante = response.data

    response = await api.get(`categoria/categorias/${produto.categoria_id}`);
    let categoria = response.data

    this.setState({
        produto: {
            id: produto.id,
            descricao: produto.descricao,
            modelo: produto.modelo,
            preco: produto.preco,
            fabricante: {
                id: fabricante.id,
                nome: fabricante.nome
            },
            categoria: {
                id: categoria.id,
                descricao: categoria.descricao
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
        let produto = this.state.produto;
        console.log( {
            modelo: produto.modelo,
            descricao: produto.descricao,
            preco: produto.preco,
            categoria_id: produto.categoria.id,
            fabricante_id: produto.fabricante.id
        });
        const response = await api.put(`produto/produtos/${produto.id}`,  {
            modelo: produto.modelo,
            descricao: produto.descricao,
            preco: produto.preco,
            categoria_id: produto.categoria.id,
            fabricante_id: produto.fabricante.id
        });
        if(response.status === 200)
            this.setState({status: !this.state.status});
    }

  onEdit = async () => {
    this.set_editing();

    let response = await api.get('fabricante/fabricantes');
    this.setState({fabricantes: response.data});

    response = await api.get('categoria/categorias');
    this.setState({categorias: response.data});
  }

  setDescricao = (e) =>{
    this.state.produto.descricao = e.target.value;
    this.setState(this.state);
  }

  setModelo = (e) =>{
    this.state.produto.modelo = e.target.value;
    this.setState(this.state);
  }

  setPreco = (e) =>{
    this.state.produto.preco = e.target.value;
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
                                    <Alerta tipo="success" texto="Atualizado com Sucesso!"/>
                                </div>
                            </div>
                    }
                    <div className='row'>
                       <div className='col-10 offset-1'>
                            <div className="mt-2 card shadow-sm">
                                <div className="card-header"> 
                                    <h5> Informações do produto </h5>
                                </div>
                                <div className="card-body">
                                    <div className='d-flex'>
                                        <div className='col-1'>
                                            <div class="form-group">
                                                <label for="id"> COD </label>
                                                <input type="text" disabled className="form-control" id="id" value={this.state.produto.id}/>
                                            </div>
                                        </div>
                                        <div className='col-5'>
                                            <div class="form-group">
                                                <label for="descricao"> Descrição </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setDescricao} class="form-control" value={this.state.produto.descricao}/>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div class="form-group">
                                                <label for="modelo"> Modelo </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setModelo} class="form-control" id="modelo" value={this.state.produto.modelo}/>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div class="form-group">
                                                <label for="preco"> Preço </label>
                                                <input type="text" disabled={!this.state.editing} onChange={this.setPreco} className="form-control" id="preco" value={this.state.produto.preco}/>
                                            </div>
                                        </div>
                                    </div>

                                    { <div className='d-flex'>
                                        <div className='col-6'>
                                            <div class="form-group">
                                                <label for="categoria"> Categoria </label>
                                                {
                                                    !this.state.editing ?
                                                        <input type="text" disabled={!this.state.editing} class="form-control" id="categoria" value={this.state.produto.categoria.descricao}/>
                                                    :
                                                        <select className='form-control' >
                                                            {this.state.categorias.map(
                                                                categoria => <option key={categoria.id} value={categoria.id} selected={(categoria.id === this.state.produto.categoria.id)} > {categoria.descricao} </option>
                                                            )}
                                                        </select>
                                                }
                                            </div>
                                        </div>
                                        { <div className='col-6'>
                                            <div class="form-group">
                                                <label for="fabricante"> Fabricante </label>
                                                {
                                                    !this.state.editing ?
                                                        <input type="text" disabled={!this.state.editing} class="form-control" id="categoria" value={this.state.produto.fabricante.nome}/>
                                                    :
                                                        <select className='form-control' >
                                                            {this.state.fabricantes.map(
                                                                fabricante => <option key={fabricante.id} value={fabricante.id} selected={(fabricante.id === this.state.produto.fabricante.id)} > {fabricante.nome} </option>
                                                            )}
                                                        </select>
                                                }
                                            </div>
                                        </div> }
                                    </div> } 
                                    
                                    <hr/>
                                    {
                                        !this.state.editing ? 
                                            <button className='btn btn-primary float-right' onClick={this.onEdit}> Editar </button> 
                                        : 
                                            <>
                                                
                                                <button className='btn btn-success float-right' onClick={this.onSave}> Salvar </button>
                                                <a className='btn btn-danger float-right mr-2' href={`/produto/${this.props.id}`}> Cancelar </a>
                                            </>
                                    }
                                    <Link className='btn btn-secondary float-left mr-2' to="/produto"> Listar Produtos </Link>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Edit;

