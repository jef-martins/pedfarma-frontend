import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default class Datagrid extends Component{

  constructor(props){
      super(props);
      
      this.state = { 
        clientes: []
      }; 
  }

  async componentDidMount() {
    const response = await api.get('cliente/clientes');
    this.setState({ clientes: response.data });
  }

  render(){
        return(
            <div className="container">
                <div className="row mt-3">
                    <div className='col-12'>
                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <h5 className='card-title text-center'> Lista de Clientes </h5>
                                <Link className='btn btn-primary btn-sm float-right mb-2' to='cliente/adicionar'> Adicionar Cliente </Link>
                               
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>COD</th>
                                            <th>Nome</th>
                                            <th>CPF</th>
                                            <th>E-mail</th>
                                            <th className='text-center'>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.clientes.map(cliente => (
                                            <tr key={cliente.id}>
                                                <td> {cliente.id} </td>
                                                <td> {cliente.nome} </td>
                                                <td> {cliente.cpf} </td>
                                                <td> {cliente.email} </td>
                                                <td className='text-center'>  
                                                    <Link to={`cliente/${cliente.id}`}> Ver mais </Link>
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