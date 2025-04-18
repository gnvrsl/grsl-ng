# GRSL Website frontend

This site is written in Typescript with React components.  It uses Vite as a build system.  It has been developed with node v20.   

## Development

To run a development version of the site, clone the repository and cd in to the directory.  The build process has only been tested with npm version 20.  If using nvm, switch to npm v20 with:
```
nvm use 20
```

Install the dependencies:
```
npm install
```

Start the dev server:
```
npm run dev
```

## Deployment

github actions workflows are configured to automatically build and deploy development and production versions of the site.  Changes pushed to the main branch are built and deployed to https://grsl.org while the dev branch will be built and deployed to https://grsl-ng.crgk.nl

The site can be built for deployment locally by running 
```
npm run build
```

## Data

The repository comes with a static copy of the data from the GRSL Database.  Updated copies of these json files can be pulled from https://old.grsl.org and placed in public/json.  

```
$ wget https://old.grsl.org/api/playerData.php -O public/json/playerData.json
$ wget https://old.grsl.org/api/teamsGames.php -O public/json/teamsGames.json
```
alternative command using curl:
```
curl -o public/json/playerData.json https://old.grsl.org/api/playerData.php && curl -o public/json/teamsGames.json https://old.grsl.org/api/teamsGames.php
```


For the production site, updated json files can be generated by running the script https://old.grsl.org/api/generateJsonData.php.  A cron job on the pancake logic web server accessess this page hourly to regenerate the data files.  

## Adding pages

New pages can be added to the site as markdown files in public/pages.  A markdown file newpage.md will be available as /page/newpage under the site root.  

[src/components/TemplatePage.tsx](src/components/TemplatePage.tsx) contains a template for creating new React based pages.  It can be copied and modified.  New React based pages will also need to be integrated into the application routing in [src/GRSLApp.tsx](src/GRSLApp.tsx)
    
## Team photos

Each team page will display a team photo if available.   To add or change a team photo, place an appropriately named photo in [public/teams](public/teams).  The file name of the photo should use the 3 letter team code in all caps with a file extension of .jpg.  For example, the Bishop FC team photo is [public/teams/BIS.jpg](public/teams/BIS.jpg).  The 3 letter team codes can be found on the team pages.  