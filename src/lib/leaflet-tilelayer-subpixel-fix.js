/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
// Fix via https://github.com/Leaflet/Leaflet/issues/3575#issuecomment-150544739
import L from 'leaflet';

(function() {
  if (!L || !L.GridLayer || !L.GridLayer.prototype) return;

  const originalInitTile = L.GridLayer.prototype._initTile;

  L.GridLayer.include({
    _initTile: function(tile) {
      originalInitTile.call(this, tile);

      const tileSize = this.getTileSize();

      tile.style.width = `${tileSize.x + 1}px`;
      tile.style.height = `${tileSize.y + 1}px`;
    }
  });
})();
