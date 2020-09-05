import React, { Component }from 'react';
import api from '../urls/apiEndereco';
import '../bootstrap.css';



class ListarEndereco extends Component{

  constructor(props){
      super(props);
      this.state = { 
        respostas: []  || '',
      }; 
  }

  async componentDidMount() {

    const response = await api.get('', this.state);

    this.setState({ respostas: response.data });
    this.setState({ status: response.status });
    this.setState({ statusText: response.statusText });
  }

  render(){
        return(
            <select class="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                { 
                    this.state.respostas.map((resposta) => {
                        return(
                            <option key={resposta.id} value={resposta.id}>{resposta.logradouro}</option>  
                        )
                    }) 
                }
            </select>
        );
    }
}

export default ListarEndereco;