import { defineConfig, tierPresets } from 'sponsorkit'
import fs from 'fs/promises'

export default defineConfig({
  providers: ['patreon'],

  tiers: [
    {
      title: 'Past Sponsors',
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    {
      title: 'Backers',
      preset: tierPresets.small,
    },
    {
      title: 'Generous Backer',
      monthlyDollars: 15,
      preset: tierPresets.base,
    },
    {
      title: 'Sponsor',
      monthlyDollars: 30,
      preset: tierPresets.medium,
    },
  ],

  async onSponsorsReady(sponsors) {
    const sponsorsMapped = sponsors
      .filter(i => i.privacyLevel !== 'PRIVATE')
      .map(i => ({
        name: i.sponsor.name,
        login: i.sponsor.login,
        avatar: i.sponsor.avatarUrl,
        amount: i.monthlyDollars,
        link: i.sponsor.linkUrl || i.sponsor.websiteUrl,
        org: i.sponsor.type === 'Organization',
      }))
      .sort((a, b) => b.amount - a.amount)

    await fs.writeFile('sponsors.json', JSON.stringify(sponsorsMapped, null, 2))
  },

  outputDir: '.',
  formats: ['svg', 'png'],

  renders: [
    {
      name: 'sponsors',
      width: 800,
    },
    {
      name: 'sponsors.wide',
      width: 1800,
    },
  ],
})
