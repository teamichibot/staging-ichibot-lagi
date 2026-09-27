/**
 * Default copy for the services section. The text is editable from the
 * database (site_data key `v2_services`, see src/lib/content.ts); icons stay
 * here in code, matched to a service by `id`.
 */
export type Service = { id: string; title: string; body: string; icon: string }
export type Step = { title: string; body: string }

export const services: Service[] = [
  {
    id: 'installation',
    title: 'Edge device installation',
    body: 'Sensors, gateways, PLC, VFD, panels and wiring, installed and commissioned on site.',
    // a gateway with ports and antennae
    icon: `<rect x="1.8" y="5.2" width="12.4" height="7" rx="1.6"/>
           <path d="M4.6 8.7h1M7.5 8.7h1M10.4 8.7h1"/>
           <path d="M4.6 5.2V2.6M11.4 5.2V2.6"/>`,
  },
  {
    id: 'training',
    title: 'In-house training',
    body: 'Hands-on industrial IoT and dashboard training with hardware kits and structured modules, as delivered for Toyota Indonesia.',
    // a board on a stand, with a trend drawn on it
    icon: `<rect x="1.8" y="2" width="12.4" height="8.4" rx="1.4"/>
           <path d="M4.6 7.6 6.9 5.3l1.8 1.8 2.7-2.9"/>
           <path d="M8 10.4V13M5.3 13h5.4"/>`,
  },
  {
    id: 'integration',
    title: 'Custom system integration',
    body: 'Automation and data projects built around your existing machines, from retrofit to full control panels.',
    // separate systems wired into one
    icon: `<circle cx="3.6" cy="3.6" r="1.9"/><circle cx="12.4" cy="3.6" r="1.9"/><circle cx="8" cy="12.4" r="1.9"/>
           <path d="M5.5 3.6h5M4.5 5.3l2.6 5.4M11.5 5.3 8.9 10.7"/>`,
  },
  {
    id: 'support',
    title: 'Maintenance and support',
    body: 'Remote monitoring, preventive visits and SLA-based support after go-live.',
    // a wrench
    icon: `<path d="M10.6 2.3a3.9 3.9 0 0 0-4.8 5L2.3 10.8a1.7 1.7 0 0 0 2.4 2.4l3.5-3.5a3.9 3.9 0 0 0 5-4.8L11 6.3 9.1 4.4z"/>`,
  },
]

export const steps: Step[] = [
  {
    title: 'Analysis',
    body: 'We start from the problem, not the hardware: which line, which decision you cannot make today, and what data would settle it. That sets what the survey goes looking for.',
  },
  {
    title: 'Site survey',
    body: 'We map your machines, data points and network, then propose the right product or custom scope.',
  },
  {
    title: 'Pilot on one line',
    body: 'Go live on a single line or area first, so you see results before committing further.',
  },
  {
    title: 'Scale up',
    body: 'Roll out to more lines and sites on the same platform, with training and support for your team.',
  },
]
