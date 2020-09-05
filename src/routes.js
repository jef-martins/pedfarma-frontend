import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import Header from './Header/header';
import './bootstrap.css';

import EditarProduto from './pages/produto/editar';
import ListarProduto from './pages/produto/listar';
import AdicionarProduto from './pages/produto/adicionar';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/produto" component={ListarProduto}/>
                <Route exact path="/produto/adicionar" component={AdicionarProduto}/>
                <Route exact path="/produto/:id" component={EditarProduto}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;