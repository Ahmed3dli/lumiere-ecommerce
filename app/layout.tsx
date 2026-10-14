import './globals.css';

export const metadata = {
  title: 'LUMIÈRE | Botanical Self-Care & Rituals',
  description: 'Clean, clinical-grade skincare, haircare, and restorative bodycare.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Tailwind Instant CDN Engine */}
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #FAF8F5;
            color: #1A1A1A;
            margin: 0;
            padding: 0;
          }
          h1, h2, h3, h4, .font-serif {
            font-family: 'Playfair Display', Georgia, serif;
          }
        `}} />
      </head>
      <body className="bg-[#FAF8F5] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}