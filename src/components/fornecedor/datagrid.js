import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Datagrid extends Component{

  constructor(props){
      super(props);
      
      this.state = { 
        fornecedores: []
      }; 
  }

  async componentDidMount() {
    const response = await api.get('fornecedor/fornecedores');
    this.setState({ fornecedores: response.data });
  }

  render(){
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'> Lista de Fornecedores </h5>
                                <Link className='btn btn-primary btn-sm float-right mb-2' to='fornecedor/adicionar'> Adicionar Fornecedor </Link>
                               
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>COD</th>
                                            <th>Nome</th>
                                            <th>CNPJ</th>
                                            <th className='text-center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.fornecedores.map(fornecedor => (
                                            <tr key={fornecedor.id}>
                                                <td> {fornecedor.id} </td>
                                                <td> {fornecedor.nome} </td>
                                                <td> {fornecedor.cnpj} </td>
                                                <td className='text-center'>  
                                                    <Link to={`fornecedor/${fornecedor.id}`}> Ver mais </Link>
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