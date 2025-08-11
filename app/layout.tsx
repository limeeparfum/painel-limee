import './styles/globals.css';

export const metadata = { title: 'Limèe Analytics', description: 'Painel da perfumaria' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
