import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

async function extractResume() {
  try {
    const pdfPath = path.join(process.cwd(), '..', '..', 'Downloads', 'Suarez,Charles.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await (pdfParse as any)(dataBuffer);
    
    console.log('PDF Text extracted:');
    console.log(data.text);
    
    // Save to a text file for review
    fs.writeFileSync('resume-text.txt', data.text);
    console.log('\nResume text saved to resume-text.txt');
  } catch (error) {
    console.error('Error extracting resume:', error);
  }
}

extractResume();

