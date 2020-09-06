import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Datagrid extends Component{

  constructor(props){
    super(props);
      
    this.state = { 
        vendas: []
    }; 
  }

  async componentDidMount() {
    let response = await api.get(`venda/vendas`);
    this.setState({vendas: response.data});
  }

  render(){
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'> Lista de Vendas </h5>
                                <Link className='btn btn-primary btn-sm float-right mb-2' to='venda/adicionar'> Nova Venda </Link>
                               
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>COD</th>
                                            <th>Cliente</th>
                                            <th className='text-center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.vendas.map(venda => (
                                            <tr key={venda.id}>
                                                <td> {venda.id} </td>
                                                <td> {venda.cliente.nome} </td>
                                                <td className='text-center'>  
                                                    <Link to={`venda/${venda.id}`}> Ver mais </Link>
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