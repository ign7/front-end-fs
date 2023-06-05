
import React, { useState, useEffect } from 'react';
import './cadastro.css';
import axios from 'axios';

function Cadastro() {


    const [cadastro, setCadastro] = useState({ nome: '', idade: '', cnh: '' });
    const [clientes, listacliente] = useState([]);
    const [atualizar, setatt] = useState();


    const [cars, setcaars] = useState({ nome: '', modelo: '', ano: '' });
    const [carros, setCarros] = useState([]);
    const [atualizarCars, setattCars] = useState();
 

    const [clienteSelecionado, setClienteSelecionado] = useState(null);


    var arrayidcliente=[];


    

    

    useEffect(() => {
        axios.get('http://localhost:8080/pessoa').then(
            result => {
                listacliente(result.data);
                //console.log(result);
            }
        );
    }, [atualizar]);

    function listarcarros(id) {
        setClienteSelecionado(id);
        axios.get('http://localhost:8080/pessoa/' + id).then(
            result => {
                setCarros(result.data.carros);
                console.log(result.data.carros);
                
            }
        //,[atualizarCars]
        )
    };


    function handleChange(event) {
        setCadastro({ ...cadastro, [event.target.name]: event.target.value })
    }


    function onSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/pessoa', cadastro).then(
            result => {
                console.log(result);
                setatt(result);
            });
    }

    function excluir(id) {
        axios.delete('http://localhost:8080/pessoa/' + id).then(
            result => {
                setatt(result);
            }
        );
    }

    ///////////////////////Carros



    function cadastrarVeiculo(id){
       
        axios.post('http://localhost:8080/carros/' + id, cars).then(
            result => {
                console.log(result.data);
                setattCars(result);
            });
    }

    function onSubmitCars(event){
        event.preventDefault();   
    }  
   


    function handleChangeCars(event) {
        setcaars({ ...cars, [event.target.name]: event.target.value })
    } 

    function excluircars(id) {
        axios.delete('http://localhost:8080/carros/' + id).then(
            result => {
                setattCars(result);
            }
        );
    }

    function updatecars(id) {
        axios.put('http://localhost:8080/carros/' + id).then(
            result => {
                setattCars(result);
            }
        );
    }


    return (
        <div className='container'>
            <h1>Cadastro  <span class="badge bg-secondary">Clientes</span></h1>
            <form onSubmit={onSubmit}>
                <div className='col-6'>
                    <div>
                        <label className='form-label' >Nome Do Cliente</label>
                        <input onChange={handleChange} value={cadastro.nome} name='nome' className='form-control' type="text"></input>
                    </div>

                    <div>
                        <label className='form-label' >Idade Do Cliente</label>
                        <input onChange={handleChange} value={cadastro.idade} name="idade" className='form-control' type="number"></input>
                    </div>

                    <div>
                        <label className='form-label' >CNH Do Cliente</label>
                        <input onChange={handleChange} value={cadastro.cnh} name="cnh" className='form-control' type="text"></input>
                    </div>
                    <br />
                    <div>
                        <button type="submit" class="btn btn-success" value="salvar" >Cadastrar</button>
                    </div>
                </div>
            </form>
            <hr></hr>
            <hr></hr>

            <div>
                <h2>Lista De <span class="badge bg-secondary">Clientes</span></h2>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nome Cliente</th>
                        <th scope="col">Idade </th>
                        <th scope="col">CNH</th>
                        <th scope="col">Opçoes</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(clients => (
                       
                        <tr key={clients.id}>
                            <td>{clients.nome}</td>
                            <td>{clients.idade}</td>
                            <td>{clients.cnh}</td>
                            <td>
                            <button onClick={() => listarcarros(clients.id)} className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">Veiculos</button>&nbsp;                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h5>Lista De <span class="badge bg-secondary">Veiculos</span></h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                         <h3>Cadastro  <span class="badge bg-secondary">Carros</span></h3>
                                            <form >
                                                <div className='col-12'>
                                                    <div>
                                                        <label className='form-label'>Nome Do Veiculo</label>
                                                        <input onChange={handleChangeCars} value={cars.nome} name='nome' className='form-control' type="text"></input>
                                                    </div>

                                                    <div>
                                                        <label className='form-label' >Marca Do Veiculo</label>
                                                        <input onChange={handleChangeCars} value={cars.marca} name="marca" className='form-control' type="text"></input>
                                                    </div>

                                                    <div>
                                                        <label className='form-label' >Ano Do Veiculo</label>
                                                        <input onChange={handleChangeCars} value={cars.ano} name="ano" className='form-control' type="text"></input>
                                                    </div>
                                                    <br/>                                                                                                                        
                                                    {clientes.map(idclient =>(                                                        
                                                    idclient.id ===clienteSelecionado ?(
                                                    <button key={idclient.id} class="btn btn-success" value="cadastroveiculo" onClick={()=> cadastrarVeiculo(clienteSelecionado)} >Adicionar</button>                                                                                                                                                                                                                                                                                                                                                                        
                                                  ):null                        
                                                ))}                                                      
                                            </div>
                                            </form> 
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Veiculo</th>
                                                        <th scope="col">Marca</th>
                                                        <th scope="col">Ano</th>
                                                        <th scope="col">Opçoes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {carros.map(cars => (
                                                        <tr key={cars.id}>
                                                            <td>{cars.nome}</td>
                                                            <td>{cars.marca}</td>
                                                            <td>{cars.ano}</td>
                                                            <td>
                                                            <span type="button" onClick={()=> excluircars(cars.id)} class="badge rounded-pill text-bg-dark"  data-bs-dismiss="modal">Excluir</span>&nbsp;&nbsp;
                                                            <span type="button" onClick={()=>setcaars(cars)} class="badge rounded-pill text-bg-info">Atualizar</span>&nbsp;&nbsp;
                                                            
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => excluir(clients.id)}  className='btn btn-danger'>excluir</button>&nbsp;&nbsp;
                            <button onClick={() => setCadastro(clients)} className='btn btn-warning'>Atualizar</button>&nbsp;&nbsp;
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cadastro;
