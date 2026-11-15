# Footer icons

These SVGs are bundled with the site so server rendering never needs an icon API.
`ExternalLinks.astro` maps `pack:name` to the local `pack/name.svg` file.

Downloaded from https://api.iconify.design on 2026-11-15:

- `mdi`: Material Design Icons, https://github.com/Templarian/MaterialDesign, Apache-2.0.
- `ic`: Google Material Icons, https://github.com/google/material-design-icons, Apache-2.0.
- `ant-design`: Ant Design Icons, https://github.com/ant-design/ant-design-icons, MIT.
- `simple-icons`: Simple Icons, https://github.com/simple-icons/simple-icons, CC0-1.0.

When adding a footer link, include its SVG here. Verify complete server-rendered
pages with `SITE_URL=https://your-deployment.example bun test scripts/site.test.ts`.
