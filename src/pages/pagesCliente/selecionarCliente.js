import React, { Component } from 'react';
import SelecionarCliente from '../classesCliente/classeSelecionarCliente';

class SelCliente extends Component {
    
    render(){
        return (
            <div className="App">
                <SelecionarCliente id={this.props.match.params.id}/>
            </div>
        );
    }
  
}

export default SelCliente;
