import React, { Component }from 'react';
import '../bootstrap.css'; 
import api from '../urls/apiVenda_item'; 
import {Link} from 'react-router-dom';



class GerarVenda_item extends Component{

  constructor(props){
      super(props);
      this.state = { 
        venda_id: props.idVenda || '',
        produto_id: props.idProduto || '',
        st: 0,
        status: 0,
        respostas: [] || '',
      }; 
  }

  async componentDidMount() {

    const response = await api.post('', this.state);

    this.setState({respostas: response.data });
    this.setState({status: response.status });
    this.setState({statusText: response.statusText });
    
  }

  render(){
        return(
            <div>
                {this.state.status !== 0 &&
                    <div>
                        {
                            this.state.status < 400 ?
                                <div>
                                    Venda Realizada com Sucesso!!
                                    <div className='p-3 mb-2 mt-2 bg-info text-white'>{this.state.status} - {this.state.statusText}</div>
                                </div>
                            :
                                <div className="p-3 mb-2 mt-2 bg-danger text-white">{this.state.status} - {this.state.statusText}</div>
                        }
                    </div>
                }
                <Link className="btn btn-info mt-2" to={`/produto`}>Listar Produtos</Link>
            </div>
        );
    }
}

export default GerarVenda_item;





