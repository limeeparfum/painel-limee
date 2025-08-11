'use client';
import Shell from '../../../components/Shell';
import { useStore } from '../../../components/store';

export default function Dashboard() {
  const vendas = useStore(s => s.vendas);
  const produtos = useStore(s => s.produtos);
  const caixa = useStore(s => s.caixa);

  const receita = vendas.reduce((acc, v) => acc + v.total, 0);
  const entradas = caixa.filter(c=>c.tipo==='entrada').reduce((a,c)=>a+c.valor,0);
  const saidas = caixa.filter(c=>c.tipo==='saida').reduce((a,c)=>a+c.valor,0);
  const fluxo = entradas - saidas;

  return (
    <Shell>
      <div className="grid">
        <div className="card"><div className="muted">Receita em vendas</div><div className="kpi">R$ {receita.toFixed(2)}</div></div>
        <div className="card"><div className="muted">Produtos ativos</div><div className="kpi">{produtos.length}</div></div>
        <div className="card"><div className="muted">Fluxo de caixa</div><div className="kpi">R$ {fluxo.toFixed(2)}</div></div>
      </div>
      <div style={{height:16}} />
      <div className="card">
        <h3>Últimas vendas</h3>
        <table className="table">
          <thead><tr><th>Data</th><th>Produto</th><th>Qtd</th><th>Total</th></tr></thead>
          <tbody>
            {vendas.slice(-5).reverse().map(v => (
              <tr key={v.id}>
                <td>{new Date(v.data).toLocaleString('pt-BR')}</td>
                <td>{(produtos.find(p=>p.id===v.produtoId) || {nome:'N/D'}).nome}</td>
                <td>{v.qtd}</td>
                <td>R$ {v.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
