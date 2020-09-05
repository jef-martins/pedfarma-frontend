import React, { Component }from 'react';
import '../bootstrap.css';
import ExcluirCliente from '../classesCliente/classeExcluirCliente';  
import api from '../urls/apiCliente';  


class Excluir extends Component{

  constructor(props){
      super(props);
      this.state = {
        cpf: '', 
        nome: '',
        email: '',
        st: 0,
        respostas: [] || '',
      }; 
      this.salvar = this.salvar.bind(this);
  }
  async componentDidMount() {
    const response = await api.get('/'+this.props.match.params.id, this.state);
    this.setState({respostas: response.data });
    this.setState({status: response.status });
    this.setState({statusText: response.statusText });
    this.setState({cpf: this.state.respostas.cpf});
    this.setState({nome: this.state.respostas.nome});
    this.setState({email: this.state.respostas.email});
  }

  salvar(){
    this.setState({st: 1});
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    {
                        this.state.st === 1 ?
                            <div>
                                <ExcluirCliente id={this.props.match.params.id}/>
                            </div>
                        :
                            <div>
                                <div className="card-header"><h4>Tem Certeza que deseja excluir esse item?</h4></div>
                                 <div className="card-body">
                                    <p className="card-title">nome: {this.state.nome}</p>
                                    <p className="card-text"> CPF: {this.state.cpf}</p>
                                    <p className="card-text"> email: {this.state.email}</p> 
                                </div>
                                <button className="mb-3 btn btn-danger" onClick={this.salvar}>Excluir</button>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export default Excluir;





