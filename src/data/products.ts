import energyDashboard from '../assets/products/energy-monitoring-dashboard.jpg'
import equipmentDashboard from '../assets/products/equipment-monitoring-dashboard.jpg'
import plantationDashboard from '../assets/products/smart-plantation-dashboard.jpg'

/**
 * The four packaged products from the brief.
 *
 * Hardcoded for phase 1. Phase 2 moves this to Supabase so the admin panel can
 * edit it; the shape here is what that query has to return.
 *
 * `deploymentTime` is a brief open item — deliberately left as a placeholder
 * rather than guessed, because it is a promise made to a customer.
 */
export type Product = {
  key: 'energy' | 'vision' | 'equip' | 'plant'
  name: string
  desc: string
  included: string
  /** Label above the client list: real deployments vs a running pilot. */
  proofLabel: string
  proof: string[]
  deploymentTime: string
  pilot?: boolean
  /**
   * A real screenshot of the product's own dashboard. Where one exists it
   * replaces `mock` entirely — the brief's open item is to get rid of the
   * mockups, not to decorate them.
   */
  screenshot?: ImageMetadata
  /** Illustrative fallback, used only until a real screenshot exists. */
  mock: {
    top: string
    metrics: [value: string, label: string][]
    line: number[]
  }
}

export const products: Product[] = [
  {
    key: 'energy',
    name: 'Smart energy usage monitoring',
    desc: 'See kWh, peak load and power quality per transformer, panel and line, in real time.',
    included: 'Power meters, edge gateway, energy dashboard template',
    proofLabel: 'Proven at',
    proof: ['Toyota Indonesia: 2 MVA transformer', 'Penerbit Erlangga: electricity substation'],
    deploymentTime: 'Live in [X] weeks',
    screenshot: energyDashboard,
    mock: {
      top: 'Main panel, Plant 1',
      metrics: [['412', 'kWh today'], ['1.8 MW', 'Peak load'], ['0.97', 'Power factor']],
      line: [60, 52, 58, 40, 46, 30, 36, 24, 34, 28, 20, 26],
    },
  },
  {
    key: 'vision',
    name: 'AI Vision Engine',
    desc: 'Turn existing CCTV into automatic inspectors for PPE compliance, safety zones and spill detection.',
    included: 'Edge AI unit, pre-trained models, alert dashboard',
    proofLabel: 'Proven at',
    proof: ['Pertamina: PPE detection', 'Pertamina: PPE and oil spill detection'],
    deploymentTime: 'Live in [X] weeks',
    mock: {
      top: 'Gate 3, CCTV-07',
      metrics: [['97%', 'PPE compliance'], ['2', 'Violations today'], ['12', 'Cameras']],
      line: [20, 22, 18, 24, 20, 26, 22, 18, 20, 16, 22, 18],
    },
  },
  {
    key: 'equip',
    name: 'Smart equipment monitoring',
    desc: 'Track pressure, temperature, vibration and status of compressors, pumps and vehicles before they fail.',
    included: 'Retrofit sensors, PLC integration, condition alerts',
    proofLabel: 'Proven at',
    proof: [
      'Toyota Indonesia: Kaeser compressor',
      'Pertamina: vehicle tilt and pitch',
      'PT Garam: main pump automation',
    ],
    deploymentTime: 'Live in [X] weeks',
    screenshot: equipmentDashboard,
    mock: {
      top: 'Compressor ES300',
      metrics: [['7.2 bar', 'Pressure'], ['68 °C', 'Temperature'], ['2.1 mm/s', 'Vibration']],
      line: [40, 42, 38, 44, 40, 46, 42, 50, 48, 56, 52, 60],
    },
  },
  {
    key: 'plant',
    name: 'Smart plantation',
    desc: 'Solar-powered soil monitoring over LoRa for large oil palm plantations with no grid or signal.',
    included: 'Solar sensor nodes, LoRa gateway, soil dashboard',
    proofLabel: 'Pilot running at',
    proof: ['Oil palm plantation, on-going'],
    deploymentTime: 'Pilot',
    pilot: true,
    screenshot: plantationDashboard,
    mock: {
      top: 'Block A-12',
      metrics: [['32%', 'Soil moisture'], ['5.6', 'Soil pH'], ['48', 'Nodes online']],
      line: [50, 48, 46, 44, 40, 38, 36, 50, 48, 46, 44, 42],
    },
  },
]
