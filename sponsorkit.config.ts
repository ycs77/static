import { defineConfig, presets } from 'sponsorkit'

export default defineConfig({
  providers: ['patreon'],
  tiers: [
    {
      title: 'Backers',
      preset: presets.base,
    },
    {
      title: 'Sponsor',
      monthlyDollars: 25,
      preset: presets.medium,
    },
  ]
})
