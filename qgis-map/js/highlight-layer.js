var highlightLayer;

function highlightFeature(e) {
    highlightLayer = e.target;
    highlightLayer.openPopup();
}

var hash = new L.Hash(map);

function setBounds() {
}
