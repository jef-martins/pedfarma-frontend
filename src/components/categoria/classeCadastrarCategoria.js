import React, { Component }from 'react';
import '../bootstrap.css';
import api from '../urls/apiCategoria';
import {Link} from 'react-router-dom';


class CadastroCategoria extends Component{

  constructor(props){
      super(props);
      this.state = { 
        descricao: props.descricao || '',
        id: props.id || '',
        respostas: [] || '',
      }; 
  }
  async componentDidMount() { 
    
    const response = await api.post('');

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Nova Categoria</div>
                    <div className="card-body">
                        {this.state.status}
                        <h5 className="card-title">Categoria: {this.state.respostas.descricao}</h5>
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

export default CadastroCategoria;