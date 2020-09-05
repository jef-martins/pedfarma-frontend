import React, { Component }from 'react';
import '../bootstrap.css';
import api from '../urls/apiFabricante';
import {Link} from 'react-router-dom';


class CadastroFabricante extends Component{

  constructor(props){
      super(props);
      this.state = { 
        nome: props.nome || '',
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
                    <div className="card-header">Novo Fabricante</div>
                    <div className="card-body">
                        {this.state.status}
                        <h5 className="card-title">Fabricante: {this.state.respostas.nome}</h5>
                        {
                            this.state.id !== '' ?
                                <Link className="btn btn-info" to={`/produto/atualizar/${this.state.id}`}>Voltar</Link>
                            :
                                <Link className="btn btn-info" to={`/produto/cadastrar/add`}>Voltar</Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CadastroFabricante;