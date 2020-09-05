import React, { Component }from 'react';
import '../bootstrap.css'; 
import api from '../urls/apiVenda'; 
import GerarVenda_item from './classeGerarVenda_item';



class GerarVenda extends Component{

  constructor(props){
      super(props);
      this.state = { 
        cliente_id: props.idCliente || '',
        produto_id: props.idProduto || '',
        idVenda: 0,
        st: 0,
        status: 0,
        ultimo: [],
        vendas: [] || '',
        respostas: [] || '',
      }; 
  }

  async componentDidMount() {

    const response = await api.post('', this.state);

    this.setState({respostas: response.data });
    this.setState({status: response.status });
    this.setState({statusText: response.statusText });

    const response2 = await api.get('', this.state);
    this.setState({vendas: response2.data });
    this.setState({status: response2.status });
    this.setState({statusText: response2.statusText });
    this.setState({ultimo: this.state.vendas.slice(-1)[0]});
  }

  render(){
        return(
            <div className="container">
                <div className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-body">
                        <div>
                            {
                                this.state.status < 400 ?
                                    this.state.ultimo.id !== undefined &&
                                        <GerarVenda_item idProduto={this.state.produto_id} idVenda={this.state.ultimo.id}/>
                                :
                                    <div className="p-3 mb-2 mt-2 bg-danger text-white">{this.state.status} - {this.state.statusText}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GerarVenda;





/*

<select className="mb-3 custom-select"  onChange={this.setCliente} value={this.state.idCliente} aria-label="Example select with button addon">
    <option>Escolha um Cliente</option>
    {
        this.state.vendas.map((resp) => {
            return(
                this.state.vendas.length === resp.id &&
                    <option key={resp.id} value={resp.id}>{resp.id}</option>
            )
        }) 
    }
</select>  
*/