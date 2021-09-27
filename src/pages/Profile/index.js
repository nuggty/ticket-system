import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from '../../assets/avatar.png'
import './profile.css';
import firebase from '../../services/firebaseConnection'

import { AuthContext } from '../../contexts/auth';

const Profile = () => {

    const { user, signOut, setUser, storageUser } = useContext(AuthContext)

    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    const handleFile = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                alert('Envie uma imagem do tipo PNG ou JPEG')
                setImageAvatar(null)
                return null
            }
        }

        // console.log(e.target.files[0])
    }

    const handleUpload = async () => {
        const currentUid = user.uid;
        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                console.log('FOTO ENVIADA COM SUCESSO')
                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url;
                        await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlFoto,
                                name: name
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                    name: name
                                }
                                setUser(data);
                                storageUser(data);
                            })
                    })
            })
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (imageAvatar === null && name !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    name: name
                })
                .then(() => {
                    let data = {
                        ...user,
                        name: name
                    }
                    setUser(data);
                    storageUser(data);
                })
        } else if (name !== '' && imageAvatar !== null) {
            handleUpload()
        }
    }

    return (
        <>
            <Header />
            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="FFF" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuário" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuário" />
                            }
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Email</label>
                        <input type="email" value={email} disabled={true} />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => signOut()}>
                        Sair
                    </button>
                </div>
            </div>

        </>
    )
}

export default Profile
