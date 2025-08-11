# Limèe Analytics — Base (pronta para Vercel)

Painel base com proteção por **Basic Auth** e páginas:
- Dashboard
- Produtos
- Vendas
- Entradas/Saídas
- Notas Promissórias

> Esta versão salva dados localmente no navegador (demo). Depois conectamos ao **Postgres da Vercel**.

## Como publicar (só cliques)
1. Suba esta pasta no GitHub (arraste todos os arquivos).
2. Na Vercel, **Import Project** do repositório.
3. Em **Environment Variables**, adicione:
   - `BASIC_AUTH_USER` = `geovannylima`
   - `BASIC_AUTH_PASS` = `Limeegeolima2910parfum@`
4. Clique **Deploy**.

Pronto! Ao acessar, o navegador pedirá usuário/senha (basic auth).

## Próximos passos (quando quiser)
- Conectar ao Postgres (Vercel → Add New → Storage → Postgres) e trocar o store local por API rotas / banco.
- Adicionar gráficos no Dashboard e exportação CSV.
