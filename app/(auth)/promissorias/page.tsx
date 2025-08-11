'use client';
import Shell from '@/components/Shell';
import { useStore } from '@/components/store';
import { useState } from 'react';

export default function Promissorias() {
  const { promissorias, addProm, pagarProm } = useStore();
  const [cliente,setCliente] = useState('');
  const [valor,setValor] = useState('');

  return (
    <Shell>
      <div className="grid">
        <div className="card">
          <h3>Nova promissória</h3>
          <div className="form">
            <input className="input" placeholder="Cliente" value={cliente} onChange={e=>setCliente(e.target.value)} />
            <input className="input" placeholder="Valor total" value={valor} onChange={e=>setValor(e.target.value)} />
            <button className="button" onClick={()=>{
              if(!cliente || !valor) return;
              addProm({ data: new Date().toISOString(), cliente, valor: Number(valor) });
              setCliente(''); setValor('');
            }}>Cadastrar</button>
          </div>
        </div>
        <div className="card">
          <h3>Promissórias</h3>
          <table className="table">
            <thead><tr><th>Data</th><th>Cliente</th><th>Valor</th><th>Pago</th><th>Status</th><th>Ações</th></tr></thead>
            <tbody>
              {promissorias.slice().reverse().map(p => (
                <tr key={p.id}>
                  <td>{new Date(p.data).toLocaleString('pt-BR')}</td>
                  <td>{p.cliente}</td>
                  <td>R$ {p.valor.toFixed(2)}</td>
                  <td>R$ {p.pago.toFixed(2)}</td>
                  <td>{p.status}</td>
                  <td>
                    {p.status==='aberta' && (
                      <button className="button" onClick={()=>{
                        const v = Number(prompt('Valor do pagamento?', '0')||'0');
                        if (v>0) pagarProm(p.id, v);
                      }}>Pagamento parcial</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}
