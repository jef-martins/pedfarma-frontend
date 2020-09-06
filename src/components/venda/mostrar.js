import React from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';


export default class Mostrar extends React.Component {
    constructor(props){
        super(props);
          
        this.state = { 
            cliente: {
                nome: ''
            },
            produtos: []
        }; 
      }
    
      async componentDidMount() {
        let response = await api.get(`venda/vendas/${this.props.id}`);
        this.setState({cliente: response.data.cliente});

        response = await api.get(`venda_item/venda_itens/${this.props.id}`);
        this.setState({produtos: response.data});

        console.log(response.data);
      }

    render(){
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-header'>
                                 <h5>Informações da venda</h5> 
                            </div>
                            <div className='card-body'>

                                <div className='row mb-4'>
                                    <div className='col-12'>
                                        <div className='card'>
                                            <div className='card-body row'>
                                                <div className='col-2'>
                                                    <strong>Venda: </strong> {this.props.id}        
                                                </div>
                                                <div className='col-2'>
                                                    <strong>Cliente: </strong> {this.state.cliente.nome}    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className='row justify-content-center'> 
                                    <h5> Produtos </h5>
                                </div>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr className='bg-light'>
                                            <th>COD</th>
                                            <th>Descrição</th>
                                            <th>Modelo</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.produtos.map(produto => {
                                            const { id, descricao, modelo, preco } = produto.produto;

                                            return (
                                                <tr key={id}>
                                                    <td> {id} </td>
                                                    <td> {descricao} </td>
                                                    <td> {modelo} </td>
                                                    <td> {preco} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                
                                <strong className='float-right mt-2'> Total:  {this.state.produtos.length > 0 && this.state.produtos.reduce((acm, item) => acm + parseFloat(item.produto.preco), 0.0).toFixed(2)} </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}