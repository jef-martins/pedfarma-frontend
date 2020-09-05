import React, { Component }from 'react';
import '../bootstrap.css';  
import CadastroEndereco from '../classesEndereco/classeCadastrarEndereco';
import api from '../urls/apiBairro';


class Endereco extends Component{

  constructor(props){
      super(props);
      this.state = { 
        logradouro: '',
        complemento: '',
        cep: '',
        bairro_id: '',
        st: 0,
        bairro: [],
        respostas: [] || '',
      }; 
      this.setLogradouro = this.setLogradouro.bind(this);
      this.setComplemento = this.setComplemento.bind(this);
      this.setCep = this.setCep.bind(this);
      this.setBairro = this.setBairro.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  async componentDidMount() {

    const response2 = await api.get('', this.state);
    this.setState({bairro: response2.data });
    this.setState({status: response2.status });
    this.setState({statusText: response2.statusText });
  }
  setLogradouro(e){
    let valor = e.target.value;
    this.setState({logradouro: valor});
  }
  setComplemento(e){
    let valor = e.target.value;
    this.setState({complemento: valor});
  }
  setCep(e){
    let valor = e.target.value;
    this.setState({cep: valor});
  }
  setBairro(e){
    let valor = e.target.value;
    this.setState({bairro_id: valor});
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
                                    <CadastroEndereco id={this.props.match.params.id} 
                                        logradouro={this.state.logradouro}
                                        complemento={this.state.complemento}
                                        cep={this.state.cep} bairro_id={this.state.bairro_id}
                                    />
                                </div>
                            :
                                <div>
                                    <input onChange={this.setLogradouro} className="mb-3 form-control" value={this.state.logradouro} placeholder="Digite o Logradouro"/>                
                                    <input onChange={this.setComplemento} className="mb-3 form-control" value={this.state.complemento} placeholder="Digite o Complemento"/> 
                                    <input onChange={this.setCep} className="mb-3 form-control" value={this.state.cep} placeholder="Digite o CEP"/> 
                                    <select className="mb-3 custom-select" onChange={this.setBairro} value={this.state.bairro_id} aria-label="Example select with button addon">
                                        <option>Escolha um Bairro ...</option>
                                        {
                                            this.state.bairro.map((bar) => {
                                                return(
                                                    <option key={bar.id} value={bar.id}>{bar.descricao}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                    <button className="btn btn-info" onClick={this.salvar}>Salvar</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Endereco;





