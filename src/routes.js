import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import Header from './Header/header';
import './bootstrap.css';

import EditarProduto from './pages/produto/editar';
import ListarProduto from './pages/produto/listar';
import AdicionarProduto from './pages/produto/adicionar';

import ListarCliente from './pages/cliente/listar';
import EditarCliente from './pages/cliente/editar';
import AdicionarCliente from './pages/cliente/adicionar';

import ListarFornecedor from './pages/fornecedor/listar';
import EditarFornecedor from './pages/fornecedor/editar';
import AdicionarFornecedor from './pages/fornecedor/adicionar';

import ListarVendas from './pages/venda/listar';
import MostrarVenda from './pages/venda/mostrar';
import AdicionarVenda from './pages/venda/adicionar';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/produto" component={ListarProduto}/>
                <Route exact path="/produto/adicionar" component={AdicionarProduto}/>
                <Route exact path="/produto/:id" component={EditarProduto}/>

                <Route exact path="/cliente" component={ListarCliente}/>
                <Route exact path="/cliente/adicionar" component={AdicionarCliente}/>
                <Route exact path="/cliente/:id" component={EditarCliente}/>

                <Route exact path="/fornecedor" component={ListarFornecedor}/>
                <Route exact path="/fornecedor/adicionar" component={AdicionarFornecedor}/>
                <Route exact path="/fornecedor/:id" component={EditarFornecedor}/>

                <Route exact path="/venda" component={ListarVendas}/>
                <Route exact path="/venda/adicionar" component={AdicionarVenda}/>
                <Route exact path="/venda/:id" component={MostrarVenda}/>

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;