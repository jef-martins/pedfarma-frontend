import React, { Component }from 'react';
import '../bootstrap.css';
import api from '../urls/apiFornecedor';
import {Link} from 'react-router-dom';


class ExcluirFornecedor extends Component{

  constructor(props){
      super(props);
      this.state = { 
        id: props.id || '',
        respostas: [] || '',
      }; 
  }
  async componentDidMount() { 
    
    const response = await api.delete('/'+this.state.id, this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">
                        {
                            this.state.status < 400 ?
                                "Item Excluído"
                            :
                                "Erro ao excluir"
                        }
                    </div>
                    <div className="card-body">
                        {
                            this.state.status < 400 ?
                                <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                            :
                                <div className="p-3 mb-2 mt-2 bg-danger text-white">{this.state.status} - {this.state.statusText}</div>
                        }
                        <Link className="btn btn-info" to={`/fornecedor`}>Listar Fornecedor</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ExcluirFornecedor;