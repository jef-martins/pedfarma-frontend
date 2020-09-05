import React, { Component }from 'react';
import '../bootstrap.css';
import api from '../urls/apiEndereco';
import {Link} from 'react-router-dom';


class CadastroEndereco extends Component{

  constructor(props){
      super(props);
      this.state = { 
        logradouro: props.logradouro || '',
        complemento: props.complemento || '',
        cep: props.cep || '',
        bairro_id: props.bairro_id || '1',
        id: props.id || '',
        respostas: [] || '',
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
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-body">
                    <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                        <h5 className="card-title">Endereco: {this.state.respostas.logradouro}</h5>
                        <p className="card-title">Complemento: {this.state.respostas.complemento}</p>
                        <p className="card-title">CEP: {this.state.respostas.cep}</p>
                        {
                            this.state.id !== '' ?
                                <Link className="btn btn-info" to={`/cliente/atualizar/${this.state.id}`}>Voltar</Link>
                            :
                                <Link className="btn btn-info" to={`/cliente/cadastrar/add`}>Voltar</Link>
                        }
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroEndereco;