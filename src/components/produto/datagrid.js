import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Datagrid extends Component{

  constructor(props){
      super(props);
      
      this.state = { 
        produtos: []
      }; 
  }

  async componentDidMount() {
    const response = await api.get('produto/produtos');
    this.setState({ produtos: response.data });
  }

  render(){
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'> Lista de produtos </h5>
                                <Link className='btn btn-primary btn-sm float-right mb-2' to='produto/adicionar'> Adicionar produto </Link>
                               
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
                                        {this.state.produtos.map(produto => (
                                            <tr>
                                                <td> {produto.id} </td>
                                                <td> {produto.descricao} </td>
                                                <td> {produto.modelo} </td>
                                                <td> {produto.preco} </td>
                                                <td className='text-center'>  
                                                    <Link to={`produto/${produto.id}`}> Ver mais </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}