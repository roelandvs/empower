<img width="1440" alt="Screenshot 2021-01-22 at 11 25 22" src="https://user-images.githubusercontent.com/59770136/105479306-96d70d00-5ca4-11eb-969c-536969b51429.png">
https://roelandvs.github.io/empower/qgis-map

# EMPOWER 2.0
The focus of the application is helping prosumers in their effort to make a green energy community. Our goal is to to create inspirational examples of features for the digital platform EMPOWER 2.0 by exploring visualization possibilities using data from Dutch open sources and combining three different types of information: the number of initiatives in a place and its characteristics, the renewable energy production of different areas in the Netherlands and, mainly, the capacity of production of each area.

The files are located in two folders. One is the code of the data transformation and the other is the code of the website/prototype.

## Installation Guide
Create a directory using your terminal:
```
mkdir <directory name>
```

Navigate to the directory:
```
cd <directory name>
```

Install this project:
```
git clone https://github.com/roelandvs/frontend-data.git
```

## Used tech
- [QGIS](https://www.qgis.org/en/site/)
- [QGIS2Web](https://plugins.qgis.org/plugins/qgis2web/) (plugin)
  - plugin uses [Leaflet](https://leafletjs.com/reference-1.7.1.html)
- HTML/CSS/JS

## Used Data
- [CBS - Kerncijfers wijken en buurten 2018](https://www.cbs.nl/nl-nl/maatwerk/2018/30/kerncijfers-wijken-en-buurten-2018)
- [Rijkswaterstaat - Klimaatmonitor](https://klimaatmonitor.databank.nl/dashboard/)
- [ArcGIS Hub - Gemeentegrenzen](https://hub.arcgis.com/datasets/e1f0dd70abcb4fceabbc43412e43ad4b_0)
- Data provided by Empower 2.0

## Example data of municipality
```
{
aantalBedrijfvestg: 1425,
aantalWoningen: 8147,
bevolkingsDichtheid: 224,
biogasStroomTj: {
  2015: 1.2,
  2016: 2,
  2017: 2.1,
  2018: 1.8,
},
gemAardgasVerbruikM3: 1530,
gemElekVerbuikKwh: 2570,
gemeenteCode: "GM1891",
gemeenteNaam: "Dantumadiel",
groenPercentage: {
  2015: 6.2,
  2016: 6.1,
  2017: 6.6,
  2018: 7.5,
},
huisHoudens: 7756,
inwoners: 18923,
oppervlakteHa: 8753,
percentageBewoond: 97,
totaalEnergieGebruik: {
  2015: 1138,
  2016: 1116,
  2017: 1082,
  2018: 1106,
},
totaalPersonenAuto: 9915,
windStroomTj:  {
  2015: 1,
  2016: 1,
  2017: 1,
  2018: 1,
},
}
```

## Creators of prototype
- Roeland van Stee (Main page with municipality information)
- Teunis Marseille (Connect and Profile page)
