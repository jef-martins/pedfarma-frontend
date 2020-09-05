import React, { Component } from 'react';
import SelecionarFornecedor from '../classesFornecedor/classeSelecionarFornecedor';

class SelFornecedor extends Component {
    
    render(){
        return (
            <div className="App">
                <SelecionarFornecedor id={this.props.match.params.id}/>
            </div>
        );
    }
  
}

export default SelFornecedor;
