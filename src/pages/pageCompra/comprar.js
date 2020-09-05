import React, { Component }from 'react';
import '../bootstrap.css'; 
import api from '../urls/apiCliente'; 
import GerarVenda from '../classesVenda/classeGerarVenda';


class Comprar extends Component{

  constructor(props){
      super(props);
      this.state = { 
        cpf: '',
        nome:'',
        email:'',
        idCliente: 0,
        st: 0,
        respostas: [] || '',
      }; 
      this.setCliente = this.setCliente.bind(this);
      this.salvar = this.salvar.bind(this);
  }
  async componentDidMount() {
    const response = await api.get('', this.state);
    this.setState({respostas: response.data });
    this.setState({status: response.status });
    this.setState({statusText: response.statusText });
  }
  setCliente(e){
    let valor = e.target.value;
    this.setState({idCliente: valor});
  }
  salvar(){
    this.setState({st: 1});
  }

  render(){
        return(
            <div className="container">
                <div className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Escolha um cliente para efetuar a compra</div>
                    <div className="card-body">
                        {
                            this.state.st === 1 ?
                                <div>
                                    {<GerarVenda idProduto={this.props.match.params.id} idCliente={this.state.idCliente}/>}
                                </div>
                            :
                            <div>
                                <select className="mb-3 custom-select"  onChange={this.setCliente} value={this.state.idCliente} aria-label="Example select with button addon">
                                    <option>Escolha um Cliente</option>
                                    {
                                        this.state.respostas.map((resp) => {
                                            return(
                                                <option key={resp.id} value={resp.id}>{resp.nome}</option>
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

export default Comprar;





