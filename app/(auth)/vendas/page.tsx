'use client';
import Shell from '@/components/Shell';
import { useStore } from '@/components/store';
import { useState } from 'react';

export default function Vendas() {
  const { produtos, vendas, addVenda } = useStore();
  const [produtoId,setProdutoId] = useState('');
  const [qtd,setQtd] = useState('1');

  const produto = produtos.find(p=>p.id===produtoId);
  const total = produto ? produto.preco * Number(qtd||0) : 0;

  return (
    <Shell>
      <div className="grid">
        <div className="card">
          <h3>Nova venda</h3>
          <div className="form">
            <select className="select" value={produtoId} onChange={e=>setProdutoId(e.target.value)}>
              <option value="">Selecione um produto</option>
              {produtos.map(p => <option key={p.id} value={p.id}>{p.nome} — R$ {p.preco.toFixed(2)}</option>)}
            </select>
            <input className="input" placeholder="Quantidade" value={qtd} onChange={e=>setQtd(e.target.value)} />
            <div>Total: <strong>R$ {total.toFixed(2)}</strong></div>
            <button className="button" onClick={()=>{
              if(!produtoId) return;
              addVenda({ data: new Date().toISOString(), produtoId, qtd: Number(qtd), total });
              setProdutoId(''); setQtd('1');
            }}>Registrar</button>
          </div>
        </div>
        <div className="card">
          <h3>Vendas</h3>
          <table className="table">
            <thead><tr><th>Data</th><th>Produto</th><th>Qtd</th><th>Total</th></tr></thead>
            <tbody>
              {vendas.slice().reverse().map(v => (
                <tr key={v.id}>
                  <td>{new Date(v.data).toLocaleString('pt-BR')}</td>
                  <td>{(produtos.find(p=>p.id===v.produtoId)||{nome:'N/D'}).nome}</td>
                  <td>{v.qtd}</td>
                  <td>R$ {v.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
