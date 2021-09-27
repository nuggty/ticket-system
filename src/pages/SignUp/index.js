import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { AuthContext } from '../../contexts/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== '' && email !== '' && password !== '') {
      signUp(email, password, name)
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Ticket System Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>
        <Link to="/">Já possui uma conta? Entre</Link>
      </div>
    </div>
  )
}

export default SignUp
