import './App.css'
//useffect
import { useState, useEffect } from 'react'
type ProdutoType = {
  id: number,
  nome: string,
  preco: number,
  urlfoto: string,
  descricao: string
}

function App() {
const [produtos, setProdutos] = useState<ProdutoType[]>([])
useEffect(() => {
  fetch('/api/produtos')
  .then((response) => response.json())
  .then((data) => setProdutos(data))
}, [])
function handleForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
  const form = event.currentTarget
  const formData = new FormData(form)
  const nome = formData.get('nome') as string
  const preco = formData.get('preco') as string
  const urlfoto = formData.get('urlfoto') as string
  const descricao = formData.get('descricao') as string
  fetch('/api/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }},
return (
    <>
    <div>Cadastro de Produtos</div>
    <form onSubmit={handleForm}>
      <input type="text" name="nome" placeholder="Nome" />
      <input type="number" name="preco" placeholder="Preço" />
      <input type="text" name="urlfoto" placeholder="URL da Foto" />
      <input type="text" name="descricao" placeholder="Descrição" />
      <button type="submit">Cadastrar Produto</button>
    </form>
    <div>Lista de Produtos</div>
    {
      produtos.map((produto) => (
      <div key={produto.id}>
        <h2>{produto.nome}</h2>
        <p>{produto.descricao}</p>
        <p>R$ {produto.preco}</p>
        <img src={produto.urlfoto} alt={produto.nome} width="200" />
      </div>
    ))
  }
  </>
  )
}

export default App