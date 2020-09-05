import React, { Component }from 'react';
import '../bootstrap.css';  
import CadastroCidade from '../classesEndereco/classeCadastroCidade';
import api from '../urls/apiEstado';


class Cidade extends Component{

  constructor(props){
      super(props);
      this.state = { 
        descricao: '',
        estado_id: '',
        st: 0,
        estado: [],
        respostas: [] || '',
      }; 
      this.setDescricao = this.setDescricao.bind(this);
      this.setEstado = this.setEstado.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  async componentDidMount() {

    const response2 = await api.get('', this.state);
    this.setState({estado: response2.data });
    this.setState({status: response2.status });
    this.setState({statusText: response2.statusText });
  }
  setDescricao(e){
    let valor = e.target.value;
    this.setState({descricao: valor});
  }
  setEstado(e){
    let valor = e.target.value;
    this.setState({estado_id: valor});
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
                                    <CadastroCidade id={this.props.match.params.id} 
                                        descricao={this.state.descricao}
                                        estado_id={this.state.estado_id}
                                    />
                                </div>
                            :
                                <div>
                                    <input onChange={this.setDescricao} className="mb-3 form-control" value={this.state.descricao} placeholder="Digite a cidade"/>                
                                    <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setEstado} value={this.state.estado_id} aria-label="Example select with button addon">
                                        <option>Escolha um Estado ...</option>
                                        {
                                            this.state.estado.map((bar) => {
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

export default Cidade;





