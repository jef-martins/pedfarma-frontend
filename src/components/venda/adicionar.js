import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Alerta from '../alerta/alerta';

export default class Datagrid extends Component{
    constructor(props){
        super(props);
          
        this.state = { 
            clientes: [],
            produtos: [],
            carrinho: []
        }; 
      }

    async componentDidMount() {
        let response = await api.get(`cliente/clientes`);
        let cliente = response.data;
        this.setState({clientes: cliente});

        response = await api.get(`produto/produtos`);
        let produto = response.data
        this.setState({produtos: produto});
    }

    onAddCarrinho = e => {
        e.preventDefault();
        const selectForm = document.getElementById('produto');
        const selectedItem = this.state.produtos.find(item => item.id.toString() === selectForm[selectForm.selectedIndex].value.toString());

        this.state.carrinho.push(selectedItem)
        this.setState(this.state);

        console.log(this.state.carrinho);
   }

    onDeleteCarrinho = e => {
        e.preventDefault();
        
        this.state.carrinho.splice(e.target.dataset.produtopos, 1);
        this.setState(this.state);
    }

    onSave = async e => {
        const selectForm = document.getElementById('cliente');
        const cliente_id =  selectForm[selectForm.selectedIndex].value.toString();

        let response = await api.post('venda/vendas', { cliente_id: cliente_id });
        let venda_id = response.data.id;

        this.state.carrinho.forEach( async produto => {
            await api.post('venda_item/venda_itens', { venda_id: venda_id, produto_id: produto.id });
        });
    }


    render(){
        return(
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
                                <h5> Informações do produto </h5>
                            </div>

                            <div className="card-body">
                                
                            <div className="row">
                                <div className='col-6'>
                                    <div class="form-group">
                                        <label for="cliente"> Cliente </label>
                                            <select className='form-control' id='cliente'>
                                                { this.state.clientes.map(
                                                    cliente => <option key={cliente.id} value={cliente.id} > {cliente.nome} </option>
                                                ) }
                                            </select>
                                    </div>
                                </div> 
                                <div className='col-6'>
                                    <label for="basic-url"> Produto </label>
                                    <div class="input-group">
                                        <select className='form-control' id='produto'>
                                            { this.state.produtos.map(
                                                produto => <option key={produto.id} value={produto.id}> {produto.modelo} </option>
                                            ) }
                                        </select>
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-secondary" onClick={this.onAddCarrinho} type="button">Adicionar</button>
                                        </div>
                                    </div>
                                </div> 
                            </div>

                            { this.state.carrinho.length > 0 &&
                            <div className="row mt-3">
                                <div className='col-12'>
                                <h5 className='card-title text-center'> Carrinho </h5>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>COD</th>
                                                <th>Descrição</th>
                                                <th>Modelo</th>
                                                <th>Preço</th>
                                                <th className='text-center'>#</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.carrinho.map((produto, index) => (
                                                <tr key={produto.id}>
                                                    <td> {produto.id} </td>
                                                    <td> {produto.descricao} </td>
                                                    <td> {produto.modelo} </td>
                                                    <td> {produto.preco} </td>
                                                    <td className='text-center'>  
                                                        <button className='btn btn-danger btn-sm' data-produtopos={index} onClick={this.onDeleteCarrinho}> Excluir </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <strong className='float-right mt-2'> Total:  {this.state.carrinho.reduce((acm, item) => acm + parseFloat(item.preco), 0.0).toFixed(2)} </strong>
                                </div>
                            </div>}
                           
                            <hr/> 
                            <button className='btn btn-success float-right' onClick={this.onSave}> Salvar </button>
                            <Link className='btn btn-secondary float-left mr-2' to="/venda"> Listar Vendas </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        );
    }
}