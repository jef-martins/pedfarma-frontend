import React, { Component }from 'react';
import {Link} from 'react-router-dom';
import api from '../urls/apiProduto';
import '../bootstrap.css';


class SalvarProduto extends Component{

  constructor(props){
      super(props);
      this.state = { 
        modelo:props.modelo || '',
        descricao:props.descricao || '',
        preco:props.preco || '',
        categoria_id: props.categoria_id || '',
        fabricante_id: props.fabricante_id  || '',
        respostas: []
      }; 
  }

  async componentDidMount() { 
    
    const response = await api.post('', this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div className="container">
                    {
                        this.state.status < 400 ?
                            <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                        :
                            <div className="p-3 mb-2 mt-2 bg-danger text-white">{this.state.status} - {this.state.statusText}</div>
                    }
                    <div className="card-body">
                        <h5 className="card-title">Modelo: {this.state.respostas.modelo}</h5>
                        <p className="card-text"> Descricao: {this.state.respostas.descricao}</p>
                        <p className="card-text"> Preço: {this.state.respostas.preco}</p> 
                        <p className="card-text"> Categoria: {this.state.respostas.categoria_id}</p>
                        <p className="card-text"> Fabricante: {this.state.respostas.fabricante_id}</p> 
                        <Link className="btn btn-info" to={`/produto`}>Listar Produtos</Link>
                    </div>
            </div>

        );
    }
}

export default SalvarProduto;