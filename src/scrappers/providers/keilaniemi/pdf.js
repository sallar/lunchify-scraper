import Xray from 'x-ray';
import http from 'http';
import fs from 'fs-extra';
import url from 'url';
import path from 'path';
import PDFParser from 'pdf2json';

export function getURL(venue) {
  let xray = new Xray();

  return new Promise((resolve, reject) => {
    xray(`http://www.keilaniemi.fi/lounasravintola/${venue}/`, 'a[href*=pdf]@href')(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function downloadPDF(urlToPdf) {
  const parsed = url.parse(urlToPdf);
  const pathToStream = path.resolve(__dirname, './cache', path.basename(parsed.pathname));

  return new Promise((resolve, reject) => {
    try {
      // If the file is already there, don’t do anything.
      fs.accessSync(pathToStream, fs.F_OK);
      resolve(pathToStream);
    } catch (e) {
      // Otherwise create it
      let fileStream = fs.createOutputStream(pathToStream);
      http.get(urlToPdf, response => {
        let pipe = response.pipe(fileStream);
        pipe.on('finish', () => {
          resolve(pathToStream);
        });
      });
    }
  });
}

export function extraText(pathToPdf) {
  return new Promise((resolve, reject) => {
    let pdfParser = new PDFParser();

    pdfParser.on('pdfParser_dataError', errData => reject(errData));
    pdfParser.on('pdfParser_dataReady', pdfData => {
      try {
        let pages = pdfData.formImage.Pages;
        let texts = pages
          .reduce((prev, curr) => prev.concat(curr.Texts), [])
          .map(line => line.R[0])
          .map(line => ({
            text: decodeURIComponent(line.T),
            bold: line.TS[2]
          }))
          .filter(line => line.text.match(/[a-zA-Z]+/));

        resolve(texts);
      } catch (e) {
        reject(e);
      }
    });

    pdfParser.loadPDF(pathToPdf);
  });
}
