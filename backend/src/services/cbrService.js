const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');

class CbrService {
  static async fetchRates() {
    const response = await axios.get('https://www.cbr.ru/scripts/XML_daily.asp');
    
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name) => name === 'Valute' 
    });
    
    const result = parser.parse(response.data);
    
    const valutes = result?.ValCurs?.Valute || [];
    const dateStr = result.ValCurs['@_Date']; 

    return valutes.map((item) => ({
      charCode: item.CharCode,
      name: item.Name,
      nominal: Number(item.Nominal),
      value: Number(String(item.Value).replace(',', '.')),
      previous: 0, 
      date: new Date(dateStr.split('.').reverse().join('-')), 
    }));
  }
}

module.exports = CbrService;