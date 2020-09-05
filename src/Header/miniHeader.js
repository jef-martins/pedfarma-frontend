import React, {Component} from 'react';
import '../bootstrap.css';
import '../style.css';
import {Link} from 'react-router-dom';

class MiniHeader extends Component{
    render(){
        return(
            <div className="mini-header">
                <div className="row">
                    <div className="col">
                        <Link to="/">Produto</Link>
                    </div>
                    <div className="col">
                        <Link to="/">Cliente</Link>
                    </div>
                    <div className="col">
                        <Link to="/">Fornecedor</Link>
                    </div>
                    <div className="col">
                        <Link to="/">Fabricante</Link>
                    </div>
                    <div className="col">
                        <Link to="/">Categoria</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default MiniHeader;