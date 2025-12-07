require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('../src/models/company');
const { fetchMeta } = require('../src/services/scraper');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/miplatform';

const companiesList = [
  { name: "Bajaj Finance", url: "https://www.bajajfinance.com" },
  { name: "Tata Capital Financial Services", url: "https://www.tatacapital.com" },
  { name: "HDB Financial Services", url: "https://www.hdbfs.com" },
  { name: "Sundaram Finance Ltd.", url: "https://www.sundaramfinance.in" },
  { name: "SBI Cards & Payment Services Ltd.", url: "https://www.sbicard.com" },
  { name: "CreditAccess Grameen Ltd.", url: "https://www.creditaccessgrameen.in" },
  { name: "Five-Star Business Finance Ltd.", url: "https://www.fivestarindia.com" },
  { name: "SBFC Finance Ltd.", url: "https://www.sbfc.in" },
  { name: "Edelweiss Financial Services Ltd.", url: "https://www.edelweissfin.com" },
  { name: "MAS Financial Services Ltd.", url: "https://www.mas.co.in" },
  { name: "FedBank Financial Services Ltd.", url: "https://www.fedfina.com" },
  { name: "Northern Arc Capital Ltd.", url: "https://www.northernarc.com" },
  { name: "Cholamandalam", url: "https://www.cholamandalam.com" },
  { name: "PTC India Financial Services Ltd.", url: "https://www.ptcfinancialservices.com" },
  { name: "SG Finserve Ltd.", url: "https://www.sgfinserve.com" },
  { name: "Arman Financial Services Ltd.", url: "https://www.armanindia.com" },
  { name: "Balmer Lawrie Investments Ltd.", url: "https://www.blinv.com" },
  { name: "Ugro Capital Ltd.", url: "https://www.ugrocapital.com" },
  { name: "Fusion Finance Ltd.", url: "https://fusionmicrofinance.com" },
  { name: "BFL Asset Finvest Ltd.", url: "https://www.bflassetfinvest.com" },
  { name: "Transwarranty Finance Ltd.", url: "https://www.transwarranty.com" },
  { name: "Capital Trust Ltd.", url: "https://www.capitaltrust.in" },
  { name: "Krishna Capital & Securities Ltd.", url: "https://www.krishnacapital.co.in" },
  { name: "Manipal Finance Corporation Ltd.", url: "https://www.manipalgroup.com" },
  { name: "Fullerton India Credit Company Ltd.", url: "https://www.fullertonindia.com" },
  { name: "Motilal Oswal Financial Services Ltd.", url: "https://www.motilaloswal.com" },
  { name: "IDFC First (Capital First)", url: "https://www.idfcfirstbank.com" },
  { name: "Religare Enterprises Ltd.", url: "https://www.religare.com" },
  { name: "Poonawalla Fincorp (Magma)", url: "https://www.poonawallafincorp.com" },
  { name: "LIC Housing Finance Ltd.", url: "https://www.lichousing.com" },
  { name: "PNB Housing Finance Ltd.", url: "https://www.pnbhousing.com" },
  { name: "Clix Capital", url: "https://www.clix.capital" },
  { name: "InCred Financial Services Ltd.", url: "https://www.incred.com" },
  { name: "RupeeCircle", url: "https://www.rupeecircle.com" },
  { name: "Home First Finance", url: "https://www.homefirstindia.com" },
  { name: "Hinduja Housing Finance Ltd.", url: "https://www.hindujahousingfinance.com" },
  { name: "SMFG India Home Finance", url: "https://www.smfgindiahomefinance.com" },
  { name: "Vastu Housing Finance Corp. Ltd.", url: "https://www.vastuindia.com" },
  { name: "NABARD", url: "https://www.nabard.org" },
  { name: "Satin Creditcare", url: "https://www.satincreditcare.com" },
  { name: "Ujjivan", url: "https://www.ujjivan.com" },
  { name: "ZestMoney", url: "https://www.zestmoney.in" },
  { name: "Shubham Housing Finance", url: "https://www.shubham.co" },
  { name: "Muthoot Finance", url: "https://www.muthootfinance.com" },
  { name: "Manappuram Finance", url: "https://www.manappuram.com" },
  { name: "Aditya Birla Finance", url: "https://www.adityabirlacapital.com" },
  { name: "Hero Fincorp", url: "https://www.herofincorp.com" },
  { name: "Mahindra & Mahindra Financial Services", url: "https://www.mahindrafinance.com" },
  { name: "L&T Finance", url: "https://www.ltfinance.com" },
  { name: "Shriram Finance", url: "https://www.shriramfinance.in" }
];

async function run() {
  console.log('Connecting to Mongo...');
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected. Seeding companies...');

  for (const item of companiesList) {
    try {
      const meta = await fetchMeta(item.url);
      const payload = {
        name: item.name,
        url: item.url,
        domain: (new URL(item.url)).hostname,
        description: meta.description || '',
        logo: meta.icon || '',
        metadata: { scrapedTitle: meta.title || '' }
      };
      const existing = await Company.findOne({ name: item.name });
      if (existing) {
        Object.assign(existing, payload);
        await existing.save();
        console.log('Updated:', item.name);
      } else {
        await Company.create(payload);
        console.log('Inserted:', item.name);
      }
    } catch (err) {
      console.error('Error seeding', item.name, err.message);
    }
  }

  console.log('Done seeding companies.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
