function pop_Gemeentegrenzen_2019shpGemeentegrenzen__voorlopig____kustlijn_0(feature, layer) {
    layer.on({
        mouseout: function(e) {
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table class="tooltippie">\
            <tr>\
                <td colspan="2">' + '<h3 class="gemeente-titel">' +  (feature.properties['Gemeentena'] !== null ? autolinker.link(feature.properties['Gemeentena'].toLocaleString()) : '') + '</h3>' + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Groene energie (2018):</th>\
                <td>' + (feature.properties['complete_dataset_groenPercentage/2018'] !== null ? autolinker.link(feature.properties['complete_dataset_groenPercentage/2018'].toLocaleString()) : '') + '%' + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['FID'] !== null ? autolinker.link(feature.properties['FID'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['Code'] !== null ? autolinker.link(feature.properties['Code'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['Gemeenteco'] !== null ? autolinker.link(feature.properties['Gemeenteco'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['SHAPE_Leng'] !== null ? autolinker.link(feature.properties['SHAPE_Leng'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['SHAPE_Area'] !== null ? autolinker.link(feature.properties['SHAPE_Area'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_gemeenteNaam'] !== null ? autolinker.link(feature.properties['complete_dataset_gemeenteNaam'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="population-s">' + (feature.properties['complete_dataset_inwoners'] !== null ? autolinker.link(feature.properties['complete_dataset_inwoners'].toLocaleString()) : '') + " inhabitants" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_huisHoudens'] !== null ? autolinker.link(feature.properties['complete_dataset_huisHoudens'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="density-s">' + (feature.properties['complete_dataset_bevolkingsDichtheid'] !== null ? autolinker.link(feature.properties['complete_dataset_bevolkingsDichtheid'].toLocaleString()) : '') + " people / km2" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="houses-s">' + (feature.properties['complete_dataset_aantalWoningen'] !== null ? autolinker.link(feature.properties['complete_dataset_aantalWoningen'].toLocaleString()) : '') + " houses" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_percentageBewoond'] !== null ? autolinker.link(feature.properties['complete_dataset_percentageBewoond'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="electricity-s">' + (feature.properties['complete_dataset_gemElekVerbuikKwh'] !== null ? autolinker.link(feature.properties['complete_dataset_gemElekVerbuikKwh'].toLocaleString()) : '') + " kWh" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="gas-s">' + (feature.properties['complete_dataset_gemAardgasVerbruikM3'] !== null ? autolinker.link(feature.properties['complete_dataset_gemAardgasVerbruikM3'].toLocaleString()) : '') + " m3" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="businesses-s">' + (feature.properties['complete_dataset_aantalBedrijfvestg'] !== null ? autolinker.link(feature.properties['complete_dataset_aantalBedrijfvestg'].toLocaleString()) : '') + " businesses" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="cars-s">' + (feature.properties['complete_dataset_totaalPersonenAuto'] !== null ? autolinker.link(feature.properties['complete_dataset_totaalPersonenAuto'].toLocaleString()) : '') + " cars" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display" id="surface-s">' + (feature.properties['complete_dataset_oppervlakteHa'] !== null ? autolinker.link(feature.properties['complete_dataset_oppervlakteHa'].toLocaleString()) : '') + " ha" + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_zonneStroomTj/2015'] !== null ? autolinker.link(feature.properties['complete_dataset_zonneStroomTj/2015'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_zonneStroomTj/2016'] !== null ? autolinker.link(feature.properties['complete_dataset_zonneStroomTj/2016'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_zonneStroomTj/2017'] !== null ? autolinker.link(feature.properties['complete_dataset_zonneStroomTj/2017'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_zonneStroomTj/2018'] !== null ? autolinker.link(feature.properties['complete_dataset_zonneStroomTj/2018'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_windStroomTj/2015'] !== null ? autolinker.link(feature.properties['complete_dataset_windStroomTj/2015'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_windStroomTj/2016'] !== null ? autolinker.link(feature.properties['complete_dataset_windStroomTj/2016'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_windStroomTj/2017'] !== null ? autolinker.link(feature.properties['complete_dataset_windStroomTj/2017'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_windStroomTj/2018'] !== null ? autolinker.link(feature.properties['complete_dataset_windStroomTj/2018'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_biogasStroomTj/2015'] !== null ? autolinker.link(feature.properties['complete_dataset_biogasStroomTj/2015'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_biogasStroomTj/2016'] !== null ? autolinker.link(feature.properties['complete_dataset_biogasStroomTj/2016'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_biogasStroomTj/2017'] !== null ? autolinker.link(feature.properties['complete_dataset_biogasStroomTj/2017'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_biogasStroomTj/2018'] !== null ? autolinker.link(feature.properties['complete_dataset_biogasStroomTj/2018'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_groenPercentage/2015'] !== null ? autolinker.link(feature.properties['complete_dataset_groenPercentage/2015'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_groenPercentage/2016'] !== null ? autolinker.link(feature.properties['complete_dataset_groenPercentage/2016'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_groenPercentage/2017'] !== null ? autolinker.link(feature.properties['complete_dataset_groenPercentage/2017'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_totaalEnergieGebruik/2015'] !== null ? autolinker.link(feature.properties['complete_dataset_totaalEnergieGebruik/2015'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_totaalEnergieGebruik/2016'] !== null ? autolinker.link(feature.properties['complete_dataset_totaalEnergieGebruik/2016'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_totaalEnergieGebruik/2017'] !== null ? autolinker.link(feature.properties['complete_dataset_totaalEnergieGebruik/2017'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2" class="no-display">' + (feature.properties['complete_dataset_totaalEnergieGebruik/2018'] !== null ? autolinker.link(feature.properties['complete_dataset_totaalEnergieGebruik/2018'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}