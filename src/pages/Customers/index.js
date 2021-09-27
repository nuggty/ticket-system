import { useState, useContext } from 'react'
import { FiUser } from 'react-icons/fi';
import Header from '../../components/Header';
import Title from '../../components/Title';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import './customers.css';

const Customers = () => {

    const [nameFantasia, setNameFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault()

        if (nameFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nameFantasia: nameFantasia,
                    cnpj: cnpj,
                    endereco: endereco
                })
                .then(() => {
                    setNameFantasia('');
                    setCnpj('');
                    setEndereco('');
                    toast.info('Empresa cadastrada com sucesso')
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Erro ao cadastrar essa empresa.')
                })
        } else {
            toast.error('Preencha todos os campos!')
        }
    }
    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>
                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da sua empresa" value={nameFantasia} onChange={(e) => setNameFantasia(e.target.value)} />

                        <label>CNPJ</label>
                        <input type="text" placeholder="Seu CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço da empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Customers
