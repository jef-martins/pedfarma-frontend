import React, { Component }from 'react';
import '../bootstrap.css';  
import CadastroBairro from '../classesEndereco/classeCadastrarBairro';
import api from '../urls/apiCidade';


class Bairro extends Component{

  constructor(props){
      super(props);
      this.state = { 
        descricao: '',
        cidade_id: '',
        st: 0,
        cidade: [],
        respostas: [] || '',
      }; 
      this.setDescricao = this.setDescricao.bind(this);
      this.setCidade = this.setCidade.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  async componentDidMount() {

    const response2 = await api.get('', this.state);
    this.setState({cidade: response2.data });
    this.setState({status: response2.status });
    this.setState({statusText: response2.statusText });
  }
  setDescricao(e){
    let valor = e.target.value;
    this.setState({descricao: valor});
  }
  setCidade(e){
    let valor = e.target.value;
    this.setState({cidade_id: valor});
  }
  salvar(){
    this.setState({st: 1});
  }

  render(){
        return(
            <div className="container">
                <div key={this.state.respostas.id} className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Novo Endereço{this.state.id}</div>
                    <div className="card-body">
                        {
                            this.state.st === 1 ?
                                <div>
                                    <CadastroBairro id={this.props.match.params.id} 
                                        descricao={this.state.descricao}
                                        cidade_id={this.state.cidade_id}
                                    />
                                </div>
                            :
                                <div>
                                    <input onChange={this.setDescricao} className="mb-3 form-control" value={this.state.descricao} placeholder="Digite o Bairro"/>                
                                    <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setCidade} value={this.state.cidade_id} aria-label="Example select with button addon">
                                        <option>Escolha uma Cidade ...</option>
                                        {
                                            this.state.cidade.map((bar) => {
                                                return(
                                                    <option key={bar.id} value={bar.id}>{bar.descricao}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                </div>
                                    <button className="btn btn-info" onClick={this.salvar}>Salvar</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Bairro;





