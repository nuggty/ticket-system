import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/auth';

const Dashboard = () => {
    const { signOut } = useContext(AuthContext)

    return (
        <>
            Dashboard
            <button onClick={() => signOut()}>Sair</button>
        </>
    )
}

export default Dashboard
