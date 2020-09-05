import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="container">
        <div className="card text-white bg-dark mt-3" >
            <div className="card-header">Vendas</div>
            <div className="card-body">
                <h1 className="card-title">Bem vindo ao sistema de vendas</h1>
                <p className="card-text">Um sisteminha de teste, bem simple (mais bem simples mesmo) para consumir minha API em laravel.</p>
            </div>
        </div>
    </div>
  );
}

export default Home;
