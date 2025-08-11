'use client';
import { create } from 'zustand';

export type Produto = { id: string; nome: string; preco: number; estoque: number; };
export type Venda = { id: string; data: string; produtoId: string; qtd: number; total: number; };
export type Movimento = { id: string; data: string; tipo: 'entrada'|'saida'; valor: number; descricao: string; };
export type Promissoria = { id: string; data: string; cliente: string; valor: number; pago: number; status: 'aberta'|'quitada'; };

type StoreState = {
  produtos: Produto[];
  vendas: Venda[];
  caixa: Movimento[];
  promissorias: Promissoria[];
  addProduto: (p: Omit<Produto,'id'>) => void;
  addVenda: (v: Omit<Venda,'id'>) => void;
  addMov: (m: Omit<Movimento,'id'>) => void;
  addProm: (p: Omit<Promissoria,'id'|'status'|'pago'>) => void;
  pagarProm: (id: string, valor: number) => void;
  seed: () => void;
};

const persist = (key: string, value: any) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(value));
}
const load = (key: string, fallback: any) => {
  if (typeof window === 'undefined') return fallback;
  const raw = localStorage.getItem(key);
  try { return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
}

export const useStore = create<StoreState>((set, get) => ({
  produtos: [], vendas: [], caixa: [], promissorias: [],
  addProduto: (p) => set(s => {
    const novo = { id: crypto.randomUUID(), ...p };
    const list = [...s.produtos, novo]; persist('produtos', list); return { produtos: list };
  }),
  addVenda: (v) => set(s => {
    const novo = { id: crypto.randomUUID(), ...v };
    const list = [...s.vendas, novo]; persist('vendas', list); return { vendas: list };
  }),
  addMov: (m) => set(s => {
    const novo = { id: crypto.randomUUID(), ...m };
    const list = [...s.caixa, novo]; persist('caixa', list); return { caixa: list };
  }),
  addProm: (p) => set(s => {
    const novo = { id: crypto.randomUUID(), pago: 0, status: 'aberta', ...p };
    const list = [...s.promissorias, novo]; persist('promissorias', list); return { promissorias: list };
  }),
  pagarProm: (id, valor) => set(s => {
    const list = s.promissorias.map(pr => {
      if (pr.id !== id) return pr;
      const pago = pr.pago + valor;
      const status = pago >= pr.valor ? 'quitada' : 'aberta';
      return { ...pr, pago, status };
    });
    persist('promissorias', list); return { promissorias: list };
  }),
  seed: () => set(_ => {
    const produtos = load('produtos', [
      { id: crypto.randomUUID(), nome: 'Afnan 9PM', preco: 250, estoque: 10 },
      { id: crypto.randomUUID(), nome: 'Asad Black', preco: 230, estoque: 6 }
    ]);
    const vendas = load('vendas', []);
    const caixa = load('caixa', []);
    const promissorias = load('promissorias', []);
    return { produtos, vendas, caixa, promissorias };
  })
}));
