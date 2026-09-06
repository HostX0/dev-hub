# DevsHub.cc identity

The public website and content workspace use the supplied 2026 DevsHub.cc identity. The main journey is product direction, selected work, engineering capabilities, collaboration, and contact. Arabic and English routes retain their existing data and navigation.

## Design system

| Role | Value |
| --- | --- |
| Midnight | `#0A0A0B` |
| Indigo | `#6366F1` |
| Slate | `#717F95` |
| Silver | `#E2E6F0` |
| Mint | `#10B981` |
| White | `#F8FAFC` |
| Accessible indigo button fill | `#5B5EE8` |

Light sections have their own foreground, border, and semantic color tokens. Dark framing stays consistent across the homepage, navigation, footer and admin. Indigo button fill is slightly darker than the core swatch to meet normal-text contrast requirements with white labels.

Inter handles Latin body copy and primary headings; Satoshi handles supporting display text and UI labels; Tajawal handles Arabic. Fonts are self-hosted by Next.js. Satoshi files come from [Fontshare](https://www.fontshare.com/fonts/satoshi); its bundled license is included in `apps/web/src/app/fonts/Satoshi-LICENSE.txt`.

The geometric D and modular block are vector assets. The hero artwork was generated from the supplied identity references and optimized to a 1200px WebP (approximately 64 KB). The actual wordmark remains selectable, accessible text rather than being baked into the artwork.

## Content compatibility

`apps/web/src/lib/brand.ts` maps only exact legacy seed values to the new brand copy when reading settings. Customized copy, contact details, statistics, services, project records, and explicit translations are preserved. Empty English translations paired with custom Arabic continue to use the existing Arabic fallback. Normalization is non-destructive and idempotent. New installations receive the same brand copy from the API seed.

The logo itself is the fixed DevsHub.cc identity. Existing CMS records include demo projects, example.com preview links and placeholder phone numbers; these remain editable in the existing admin. No production content was changed during implementation.

## Validation and deployment

Run `pnpm --dir apps/web test` with Node 22.6+ for the brand compatibility regression tests, `pnpm --dir apps/web lint`, and `pnpm build` for both production applications.

Browser validation uses public content snapshots with a local fixture API; contact success/error checks do not submit production messages. The Docker Compose/server deployment flow is unchanged. No database migration or new environment variable is required. Deploy after merging the reviewed branch through the existing server workflow; this change does not trigger a separate hosting provider setup.
