import { readData } from '../lib/admin-data'
import { t } from '../lib/translations'

const defaultClients = {
  industry: t.socialProof.industryClients.map((name, i) => ({ id: String(i), name, logo: '' })),
  academic: t.socialProof.academicPartners.map((name, i) => ({ id: String(i), name, logo: '' })),
}

async function main() {
  const data = await readData('clients', defaultClients);
  console.log(JSON.stringify(data, null, 2));
}

main();
