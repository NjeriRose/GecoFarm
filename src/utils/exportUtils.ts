import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { formatCurrency } from './currencyUtils';

interface ExportOptions {
  title?: string;
  headers: string[];
  data: any[];
  filename: string;
  currencyFields?: string[]; // Fields that should be formatted as currency
}

export const exportToPDF = ({ title, headers, data, filename, currencyFields = [] }: ExportOptions) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(title || '', 14, 15);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 25);
  
  // Format currency fields
  const formattedData = data.map(row => 
    row.map((cell: any, index: number) => {
      const header = headers[index];
      return currencyFields.includes(header) ? formatCurrency(cell) : cell;
    })
  );
  
  // Add table
  (doc as any).autoTable({
    head: [headers],
    body: formattedData,
    startY: 30,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};

export const exportToCSV = ({ headers, data, filename, currencyFields = [] }: ExportOptions) => {
  // Format currency fields
  const formattedData = data.map(row => 
    row.map((cell: any, index: number) => {
      const header = headers[index];
      return currencyFields.includes(header) ? formatCurrency(cell) : cell;
    })
  );

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...formattedData.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, `${filename}.csv`);
};

// Helper function to format data for export
export const formatDataForExport = (data: any[], fields: string[]): any[] => {
  return data.map(item => fields.map(field => {
    const value = item[field];
    // Handle nested objects
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  }));
}; 