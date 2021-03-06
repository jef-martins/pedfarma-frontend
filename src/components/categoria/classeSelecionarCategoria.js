import React, { Component }from './node_modules/react';
import api from '../urls/apiCategoria';
import '../bootstrap.css';


class SelecionarCategoria extends Component{

  constructor(props){
      super(props);
      this.state = { 
        id: props.id || '',
        op: props.op || '',
        respostas: [] || '',
      }; 
  }

  async componentDidMount() {
  
    const response = await api.get('/'+this.state.id,);

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
                  <p>{this.state.respostas.descricao}</p>
              }
            </div>
        );
    }
}

export default SelecionarCategoria;