import React, { Component }from 'react';

export default class Alerta extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className={`alert alert-${this.props.tipo}`}>
                {this.props.texto}
            </div>
        )
    }
}
    


