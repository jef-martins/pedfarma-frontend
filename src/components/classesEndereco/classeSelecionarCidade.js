import React, { Component }from 'react';
import api from '../urls/apiCidade';
import '../bootstrap.css';
import SelecionarEstado from './classeSelecionarEstado';


class SelecionarEndereco extends Component{

  constructor(props){
      super(props);
      this.state = { 
        id: props.id || '',
        op: props.op || '',
        respostas: [] || '',
      }; 
  }

  async componentDidMount() {
  
    const response = await api.get('/'+this.state.id, this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <div>
              {
                this.state.op === "id" ?
                  <div className="input-group">
                    <select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option value={this.state.respostas.id}>{this.state.respostas.descricao}</option>
                    </select>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"><strong>&nbsp; + &nbsp;</strong></button>
                    </div>
                  </div>
                :
                <div>
                    {
                      this.state.respostas.length !== 0 &&
                      <div>
                        <p>Cidade: {this.state.respostas.descricao}</p>
                        <p><SelecionarEstado id={this.state.respostas.estado_id}/></p>
                      </div>
                    }
                </div>
              }
            </div>
        );
    }
}

export default SelecionarEndereco;