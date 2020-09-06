import React, {Component} from 'react';
import '../bootstrap.css';
import '../style.css';
import {Link} from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <div className="header">
                <div className="row">
                    <div className="col">
                        <Link to="/produto">Produto</Link>
                    </div>
                    <div className="col">
                        <Link to="/cliente">Cliente</Link>
                    </div>
                    <div className="col">
                        <Link to="/fornecedor">Fornecedor</Link>
                    </div>
                    <div className="col">
                        <Link to="/venda">Vendas</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;