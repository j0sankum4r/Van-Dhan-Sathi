import JSZip from 'jszip';
import { ForestProduce, SaleRecord } from '../data/mockData';

// Vite eager raw imports to capture project source files directly in the browser
const projectSourceFiles = import.meta.glob(
  [
    '/src/**/*.{ts,tsx,css}',
    '/index.html',
    '/package.json',
    '/tsconfig.json',
    '/vite.config.ts'
  ],
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

/**
 * Downloads a binary or text file in the browser
 */
export function triggerBrowserDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Generates and downloads a complete ZIP of the VanDhan Saathi project codebase
 */
export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Add all discovered source files
  const fileEntries = Object.entries(projectSourceFiles);
  if (fileEntries.length > 0) {
    for (const [filepath, content] of fileEntries) {
      // Strip leading slash for clean zip relative structure
      const relativePath = filepath.startsWith('/') ? filepath.slice(1) : filepath;
      zip.file(relativePath, content);
    }
  }

  // Add README.md for the extracted project
  const readmeContent = `# VanDhan Saathi — Minor Forest Produce & Fair Supply Chain Platform

Empowering tribal gatherers and SHG federations with voice-first fair pricing, digital sales passports, and bulk buyer connections.

## Quick Start
1. Run \`npm install\` to install dependencies.
2. Run \`npm run dev\` to start the Vite development server on http://localhost:3000.
3. Run \`npm run build\` to create a production PWA build.

## Key Features
- Voice-First Market Price Board with audio synthesis in Hindi, English, and Telugu.
- IVR Simulation (Toll-Free 1800-000-0000 Call-back flow).
- Collection Centre Discovery & Illustrated Topographical Map.
- Gatherer Digital Passport Ledger (LocalStorage persisted).
- SHG Bulk Aggregation & Buyer Bidding System.
- PWA Offline Support & Installable App.

(c) 2026 VanDhan Saathi.
`;
  zip.file('README.md', readmeContent);

  const contentBlob = await zip.generateAsync({ type: 'blob' });
  triggerBrowserDownload(contentBlob, 'vandhan-saathi-project.zip');
}

/**
 * Exports gatherer sales records as a CSV file
 */
export function exportSalesToCSV(sales: SaleRecord[]): void {
  const headers = ['Sale ID', 'Produce Name', 'Produce ID', 'Weight (kg)', 'Rate per kg (₹)', 'Total Amount (₹)', 'Buyer', 'Date', 'Payment Status'];
  const rows = sales.map(s => [
    `"${s.id}"`,
    `"${s.produceName}"`,
    `"${s.produceId}"`,
    s.quantityKg,
    s.pricePerKg,
    s.totalReceived,
    `"${s.buyerName}"`,
    `"${s.date}"`,
    `"${s.paymentStatus}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerBrowserDownload(blob, `vandhan-sales-ledger-${new Date().toISOString().slice(0, 10)}.csv`);
}

/**
 * Exports current price bulletin as a formatted printable text / receipt file
 */
export function exportPriceBulletinSlip(produceList: ForestProduce[]): void {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const lines = [
    '==============================================================',
    '        VANDHAN SAATHI — DAILY FOREST PRODUCE PRICE BULLETIN  ',
    '              Tribal Fair-Trade Price Benchmark               ',
    '==============================================================',
    `Date: ${dateStr}`,
    'Demo Benchmark Data — Comparing Village Trader vs Centre vs Mandi',
    '--------------------------------------------------------------',
    'Produce Name       | Village Trader | Van Dhan Kendra | Mandi Rate | Extra Gain',
    '--------------------------------------------------------------',
    ...produceList.map(p => {
      const name = p.nameEn.padEnd(18, ' ');
      const trader = `₹${p.villageTraderRate}/${p.unit}`.padEnd(14, ' ');
      const centre = `₹${p.collectionCentreRate}/${p.unit}`.padEnd(15, ' ');
      const mandi = `₹${p.mandiRate}/${p.unit}`.padEnd(10, ' ');
      const diff = p.collectionCentreRate - p.villageTraderRate;
      const gain = `+₹${diff} (+${Math.round((diff / p.villageTraderRate) * 100)}%)`;
      return `${name} | ${trader} | ${centre} | ${mandi} | ${gain}`;
    }),
    '--------------------------------------------------------------',
    'Quality & Moisture Guidelines apply at the Collection Centre.',
    'Toll-Free Audio Rate Line: 1800-000-0000 (Missed Call)',
    'Verified by: Tribal Cooperative Federation (VDVK Hub)',
    '==============================================================',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8;' });
  triggerBrowserDownload(blob, `vandhan-price-bulletin-${new Date().toISOString().slice(0, 10)}.txt`);
}

/**
 * Exports full app demo state as JSON backup
 */
export function exportFullJsonBackup(data: Record<string, unknown>): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  triggerBrowserDownload(blob, `vandhan-data-backup-${new Date().toISOString().slice(0, 10)}.json`);
}
