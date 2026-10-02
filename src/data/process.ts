/**
 * How an Ichibot project runs, shown under Services on the homepage and on
 * every product page. One list, so the two never drift apart.
 */
export const processSteps: Record<'en' | 'id', { title: string; body: string }[]> = {
  en: [
    { title: 'Analysis', body: 'We identify the problem, the lines involved and the data needed, which defines what the site survey covers.' },
    { title: 'Site survey', body: 'We map your machines, data points and network, then propose the right product or custom scope.' },
    { title: 'Pilot on one line', body: 'Go live on a single line or area first, so you see results before committing further.' },
    { title: 'Scale up', body: 'Roll out to more lines and sites, with training and support for your team.' },
  ],
  id: [
    { title: 'Analisis', body: 'Kami mengidentifikasi masalah, lini yang terlibat, dan data yang dibutuhkan, yang menentukan cakupan survei lokasi.' },
    { title: 'Survei lokasi', body: 'Kami memetakan mesin, data point, dan jaringan Anda, lalu mengusulkan produk atau cakupan custom yang tepat.' },
    { title: 'Pilot di satu lini', body: 'Jalankan dulu di satu lini atau area, sehingga Anda melihat hasilnya sebelum melangkah lebih jauh.' },
    { title: 'Perluas', body: 'Terapkan ke lebih banyak lini dan lokasi, dengan pelatihan dan dukungan untuk tim Anda.' },
  ],
}
