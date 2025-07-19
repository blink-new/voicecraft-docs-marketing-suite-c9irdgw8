import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'voicecraft-docs-marketing-suite-c9irdgw8',
  authRequired: true
})

// Disable analytics to prevent network errors in client-only setup
if (blink.analytics && typeof blink.analytics.disable === 'function') {
  blink.analytics.disable()
}