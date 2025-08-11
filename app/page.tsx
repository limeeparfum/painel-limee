import Link from 'next/link';

export default function Page() {
  return (
    <main className="container">
      <div className="nav">
        <div className="brand">Limèe Analytics</div>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/produtos">Produtos</Link>
        <Link href="/vendas">Vendas</Link>
        <Link href="/entradas-saidas">Entradas/Saídas</Link>
        <Link href="/promissorias">Notas Promissórias</Link>
      </div>

      <div style={{height:16}} />
      <div className="card">
        <h1>Bem-vindo 👋</h1>
        <p>Efetue login básico do navegador quando solicitado (usuário e senha).</p>
        <p>Depois, use o menu acima para acessar as áreas do sistema.</p>
      </div>
      <div className="footer">© Limèe Parfum — painel base</div>
    </main>
  );
}
