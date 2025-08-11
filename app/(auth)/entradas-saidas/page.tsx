'use client';
import Shell from '@/components/Shell';
import { useStore } from '@/components/store';
import { useState } from 'react';

export default function Caixa() {
  const { caixa, addMov } = useStore();
  const [tipo,setTipo] = useState<'entrada'|'saida'>('entrada');
  const [valor,setValor] = useState('');
  const [descricao,setDescricao] = useState('');

  return (
    <Shell>
      <div className="grid">
        <div className="card">
          <h3>Novo movimento</h3>
          <div className="form">
            <select className="select" value={tipo} onChange={e=>setTipo(e.target.value as any)}>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <input className="input" placeholder="Valor" value={valor} onChange={e=>setValor(e.target.value)} />
            <input className="input" placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} />
            <button className="button" onClick={()=>{
              if(!valor) return;
              addMov({ data: new Date().toISOString(), tipo, valor: Number(valor), descricao });
              setValor(''); setDescricao('');
            }}>Registrar</button>
          </div>
        </div>
        <div className="card">
          <h3>Movimentos</h3>
          <table className="table">
            <thead><tr><th>Data</th><th>Tipo</th><th>Valor</th><th>Descrição</th></tr></thead>
            <tbody>
              {caixa.slice().reverse().map(m => (
                <tr key={m.id}>
                  <td>{new Date(m.data).toLocaleString('pt-BR')}</td>
                  <td>{m.tipo}</td>
                  <td>R$ {m.valor.toFixed(2)}</td>
                  <td>{m.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
