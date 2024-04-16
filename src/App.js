import { db } from './services/firebaseConfig'
import { useState } from 'react'
import { doc, setDoc , addDoc, collection, getDoc, getDocs, updateDoc, deleteDoc} from 'firebase/firestore' //recursos do firestore
import { get } from 'firebase/database';


function App() {
  const [titulo,setTitulo] = useState('');
  const [autor,setAutor] = useState('');
  const [idPost, setIdpost] = useState('');

  const [posts, setPosts] = useState([]);

  async function handlePost(){
    //setDoc( doc(bancodedados, 'collection', 'novodocumento'), {algumacoisa: algo})
    /*
    await setDoc(doc(db, 'posts', '153484'),{ <- passando com id fixo
      titulo: titulo,
      autor: autor
    })
    .then(()=>{
      console.log('upado');
    })
    .catch((err)=>{
      console.warn('erro: ', err);
    })
    */

    //usando addDoc, pois ele gera ID unico aleatorio (nao precisa de doc, é collection)
    await addDoc(collection(db, 'posts'),{
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      setTitulo('');
      setAutor('');
    })
    .catch((err)=>{
      console.warn(err)
    })
  }

  async function buscarPost(){
    //getDoc para buscar algum item
    //atribuindo numa variavel, aonde(db), qual colection(posts), e qual id(123 fixo)
    //id's podem ser dinamica com state, podendo passar um user por exemplo
    const postRef = doc(db, "posts", '123')

    //metodo getDoc utilizando as informações na variavel pra buscar
    await getDoc(postRef)
    //snapshots é o parametro para receber os dados(posso nomear qualquer outra coisa)
    .then((snapshots)=>{
      setAutor(snapshots.data().autor);
      setTitulo(snapshots.data().titulo);
    })
  }

  async function buscarPosts(){
    //buscando todos em lista
    //armazenando a db, e collection posts na variavel postRefs
    const postRefs = collection(db, 'posts');
    //agora utiliza o metodo getDocs (docS com S)
    await getDocs(postRefs)
    //armazena os dados da promisse em snapshots
    .then((snapshots)=>{
      //criar um array vazio pra receber os snapshots
      let lista = [];
      /* Parte mais essencial, o parametro 'snapshots precisa passar num forEach
      pra poder entrar em no indice de cada objeto dentro dos snapshots
      snapshots = [{dados1},{dados2},{etc}]
      nesse caso o 'indice' assume o valor do indice do snapshot naquele loop
      indice = {dados1}...etc
      */
      snapshots.forEach((indice)=>{
        //dar um push dos dados do snapshots[indice] na lista
        //os dados são um objeto por isso tem as {} dentro do push()
        lista.push({
          //criando as key do obj lista, e passando o valor de snapshots pra elas
          id: indice.id,
          autor: indice.data().autor,
          titulo: indice.data().titulo,
        })
      })
      setPosts(lista);
    })
    .catch((err)=>{
      console.warn(err);
    })
  
  }

  async function alterarPost(){
    const attRef = doc(db, 'posts', idPost)
    //atualizar os dados usa o metodo updateDoc
    //Nesse caso, estamos localizando com state idPost o id da doc
    await updateDoc(attRef, {
      titulo: titulo,
      autor: autor,
    })
    .then(()=>{
      setIdpost('');
      setAutor('');
      setTitulo('');
    })
    .catch(()=>{
      console.warn('erro')
    })
  }

  async function deletarPost(id){
    const delPost = doc(db, 'posts', id)
    await deleteDoc(delPost)
    .then(()=>{
      alert('deletado')
    })
  }


  return (
    <div>
      <h1>React e Firebase</h1>
      <div className='container'>
        <label>Insira o ID do post para atualizar:</label>
        <input type='text' value={idPost} onChange={(e)=>{setIdpost(e.target.value)}} />
        <br/>
        <label>Titulo:</label>
        <textarea
          type="text" placeholder='Digite o titulo'
          value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}
        />

        <label>Autor:</label>
        <input
        type='text' placeholder='Autor disso'
        value={autor} onChange={(e)=>setAutor(e.target.value)}
        />

        <button type='' onClick={handlePost}>Enviar novo post</button>
        
        <button onClick={alterarPost}>Atualizar Post</button><br/>
        <button onClick={buscarPosts}>Listar Posts</button>
        {posts.map((post)=>{
          return(
            <ul key={post.id}>
              <li>{post.id}</li>
              <li>{post.autor}</li>
              <li>{post.titulo}</li>
              <button onClick={()=>{deletarPost(post.id)}}>Excluir</button>
            </ul>
          )
        })}
      </div>
    </div>
  );
}

export default App;
