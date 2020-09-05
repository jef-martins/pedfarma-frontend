import React, {Component } from 'react';
import {Link} from 'react-router-dom';
import SalvarFornecedor from '../classesFornecedor/classeAtualizarFornecedor';
import apiEnd from '../urls/apiEndereco';
import apiBar from '../urls/apiBairro';
import apiCid from '../urls/apiCidade';
import apiEst from '../urls/apiEstado';
import apiCli from '../urls/apiFornecedor';

class AtualizarFornecedor extends Component{
    constructor(props){
        super(props);
        this.state = {
            cnpj:props.modelo || '',
            nome:props.descricao || '',
            endereco_id: '',
            bairro_id: '',
            cidade_id: '',
            estado_id: '',
            id: props.id || '',
            st:0,
            respostas: [],
            endereco: [],
            selEndereco: [],
            bairro: [],
            selBairro: [],
            cidade: [],
            selCidade: [],
            estado: [],
            selEstado: [],
        }; 
        this.setNome = this.setNome.bind(this);
        this.setCnpj = this.setCnpj.bind(this);
        this.setEndereco = this.setEndereco.bind(this);
        this.setBairro = this.setBairro.bind(this);
        this.setCidade = this.setCidade.bind(this);
        this.setEstado = this.setEstado.bind(this);
        this.salvar = this.salvar.bind(this);
    }
    async componentDidMount() {

        const response = await apiCli.get('/'+this.props.match.params.id, this.state);
        this.setState({respostas: response.data });
        this.setState({status: response.status });
        this.setState({statusText: response.statusText });
        this.setState({nome: this.state.respostas.nome });
        this.setState({cnpj: this.state.respostas.cnpj});
        this.setState({endereco_id: this.state.respostas.endereco_id });
        

        const response2 = await apiEnd.get('/'+this.state.endereco_id, this.state);
        this.setState({selEndereco: response2.data });
        this.setState({status: response2.status });
        this.setState({statusText: response2.statusText });

        const response22 = await apiEnd.get('', this.state);
        this.setState({endereco: response22.data });
        this.setState({status: response22.status });
        this.setState({statusText: response22.statusText });


        const response3 = await apiBar.get('/'+this.state.selEndereco.bairro_id, this.state);
        this.setState({selBairro: response3.data });
        this.setState({status: response3.status });
        this.setState({statusText: response3.statusText });
        
        const response33 = await apiBar.get('', this.state);
        this.setState({bairro: response33.data });
        this.setState({status: response33.status });
        this.setState({statusText: response33.statusText });


        const response4 = await apiCid.get('/'+this.state.selBairro.cidade_id, this.state);
        this.setState({selCidade: response4.data });
        this.setState({status: response4.status });
        this.setState({statusText: response4.statusText });

        const response44 = await apiCid.get('', this.state);
        this.setState({cidade: response44.data });
        this.setState({status: response44.status });
        this.setState({statusText: response44.statusText });


        const response5 = await apiEst.get('/'+this.state.selCidade.estado_id, this.state);
        this.setState({selEstado: response5.data });
        this.setState({status: response5.status });
        this.setState({statusText: response5.statusText });

        const response55 = await apiEst.get('', this.state);
        this.setState({estado: response55.data });
        this.setState({status: response55.status });
        this.setState({statusText: response55.statusText });
    
      }
      setNome(e){
        let valor = e.target.value;
        this.setState({nome: valor});
      }
      setCnpj(e){
        let valor = e.target.value;
        this.setState({cnpj: valor});
      }
      setEndereco(e){
        let valor = e.target.value;
        this.setState({endereco_id: valor});
      }
      setBairro(e){
        let valor = e.target.value;
        this.setState({bairro_id: valor});
      }
      setCidade(e){
        let valor = e.target.value;
        this.setState({cidade_id: valor});
      }
      setEstado(e){
        let valor = e.target.value;
        this.setState({estado_id: valor});
      }
      salvar(){
        this.setState({st: 1});
      }
    render(){
        return(
            <div className="container">
                <div className="mt-2 card text-white bg-dark mb-3">
                    <div className="card-header">Atualizar Fornecedor</div>
                    <div className="card-body">
                        {
                            this.state.st === 1 ?
                                <SalvarFornecedor id={this.props.match.params.id} cnpj={this.state.cnpj} nome={this.state.nome}
                                    endereco_id={this.state.endereco_id}/>
                            :
                            <div>
                                <input onChange={this.setNome} className="mb-3 form-control" value={this.state.nome} placeholder="Digite o Nome"/>
                                <input onChange={this.setCnpj} className="mb-3 form-control" value={this.state.cnpj} placeholder="Digite o CNPJ"/>
                                Estado:
                                <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setEstado} value={this.state.estado_id} aria-label="Example select with button addon">
                                    <option value={this.state.selEstado.id}>{this.state.selEstado.descricao}</option>
                                        {
                                            this.state.estado.map((est) => {
                                                return(
                                                    this.state.selEstado.id !== est.id &&
                                                        <option key={est.id} value={est.id}>{est.descricao}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                </div> 
                                Cidade:
                                <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setCidade} value={this.state.cidade_id} aria-label="Example select with button addon">
                                        <option value={this.state.selCidade.id}>{this.state.selCidade.descricao}</option>
                                        
                                        {
                                            this.state.cidade.map((cid) => {
                                                return(
                                                    this.state.selCidade.id !== cid.id &&
                                                        <option key={cid.id} value={cid.id}>{cid.descricao}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                    <div className="input-group-append">
                                        <Link to={`/cidade/${this.props.match.params.id}`} className="mb-3 btn btn-outline-secondary" type="button"><strong>&nbsp; + &nbsp;</strong></Link>
                                    </div>
                                </div>
                                Bairro:
                                <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setBairro} value={this.state.bairro_id} aria-label="Example select with button addon">     
                                        <option value={this.state.selBairro.id}>{this.state.selBairro.descricao}</option>
                                        {
                                            this.state.bairro.map((end) => {
                                                return(
                                                    this.state.selBairro.id !== end.id &&
                                                        <option key={end.id} value={end.id}>{end.descricao}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                    <div className="input-group-append">
                                        <Link to={`/bairro/${this.props.match.params.id}`} className="mb-3 btn btn-outline-secondary" type="button"><strong>&nbsp; + &nbsp;</strong></Link>
                                    </div>
                                </div> 
                                Endereço 
                                <div className="input-group">
                                    <select className="mb-3 custom-select" onChange={this.setEndereco} value={this.state.endereco_id} aria-label="Example select with button addon">     
                                        <option value={this.state.selEndereco.id}>{this.state.selEndereco.logradouro}</option>
                                        {
                                            this.state.endereco.map((end) => {
                                                return(
                                                    this.state.selEndereco.id !== end.id &&
                                                        <option key={end.id} value={end.id}>{end.logradouro}</option>
                                                )
                                            }) 
                                        }
                                    </select>
                                    <div className="input-group-append">
                                        <Link to={`/endereco/${this.props.match.params.id}`} className="mb-3 btn btn-outline-secondary" type="button"><strong>&nbsp; + &nbsp;</strong></Link>
                                    </div>
                                </div>                             
                                <button className="btn btn-info" onClick={this.salvar}>Salvar</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AtualizarFornecedor;

