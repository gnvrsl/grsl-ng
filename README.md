# GRSL Website frontend

This site is written in Typescript with React components.  It uses Vite as a build system.  It has been developed with node v20.   

## Development

To run a development version of the site, clone the repository and cd in to the directory.  

Install the dependencies:
`$ npm install`

Start the dev server:
`$ npm run dev`

## Deployment

Build the application for deployment:
`$ npm run build`

This will build a static version of the site in the dist directory.  From there it can be copied to the root of the webserver.

## Data

The repository comes with a static copy of the data from the GRSL Database.  Updated copies of these json files can be pulled from https://old.grsl.org and placed in src/assets.  Rebuild the site to incorporate the updated data. 

`$ wget https://old.grsl.org/api/playerData.php -O src/assets/playerData.json`
`$ wget https://old.grsl.org/api/teamsGames.php -O src/assets/teamsGames.json`
`$ npm run build`

## Adding pages

New pages can be added to the site as markdown files in public/pages.  A markdown file newpage.md will be available as /page/newpage under the site root.  

/src/components/TemplatePage.tsx contains a template for creating new React based pages.  It can be copied and modified.  New React based pages will also need to be integrated into the application routing in src/GRSLApp.tsx
    