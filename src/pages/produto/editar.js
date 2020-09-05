import React, { Component }from 'react';
import Form from '../../components/produto/edit';


export default class Editar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Form id={this.props.match.params.id}/>
    }
}
    




