const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');
const iconv = require('iconv-lite');

class CbrService {
  static async fetchRates() {
    const response = await axios.get('https://www.cbr.ru/scripts/XML_daily.asp', {
      responseType: 'arraybuffer' 
    });
    
    const decodedData = iconv.decode(response.data, 'windows-1251');
    
    const parser = new XMLParser({ 
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name) => name === 'Valute'
    });
    
    const result = parser.parse(decodedData);
    const valutes = result?.ValCurs?.Valute || [];
    const dateStr = result.ValCurs['@_Date'];

    return valutes.map((item) => ({
      code: item.CharCode,
      name: item.Name, 
      nominal: Number(item.Nominal),
      value: Number(String(item.Value).replace(',', '.')),
      previous_value: Number(String(item.Previous).replace(',', '.')),
      date: new Date(dateStr.split('.').reverse().join('-')),
    }));
  }
}

module.exports = CbrService;