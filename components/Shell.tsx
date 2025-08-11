'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from './store';

export default function Shell({ children }: { children: React.ReactNode }) {
  const seed = useStore(s => s.seed);
  useEffect(() => { seed(); }, [seed]);

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
      {children}
      <div className="footer">Base local (demo). Depois conectamos ao Postgres na Vercel.</div>
    </main>
  );
}
