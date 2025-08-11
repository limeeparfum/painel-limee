'use client';
import Shell from '@/components/Shell';
import { useStore } from '@/components/store';
import { useState } from 'react';

export default function Produtos() {
  const { produtos, addProduto } = useStore();
  const [nome,setNome] = useState('');
  const [preco,setPreco] = useState('');
  const [estoque,setEstoque] = useState('');

  return (
    <Shell>
      <div className="grid">
        <div className="card">
          <h3>Novo produto</h3>
          <div className="form">
            <input className="input" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
            <input className="input" placeholder="Preço" value={preco} onChange={e=>setPreco(e.target.value)} />
            <input className="input" placeholder="Estoque" value={estoque} onChange={e=>setEstoque(e.target.value)} />
            <button className="button" onClick={()=>{
              if(!nome||!preco||!estoque) return;
              addProduto({ nome, preco: Number(preco), estoque: Number(estoque) });
              setNome(''); setPreco(''); setEstoque('');
            }}>Cadastrar</button>
          </div>
        </div>
        <div className="card">
          <h3>Produtos</h3>
          <table className="table">
            <thead><tr><th>Nome</th><th>Preço</th><th>Estoque</th></tr></thead>
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}><td>{p.nome}</td><td>R$ {p.preco.toFixed(2)}</td><td>{p.estoque}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
