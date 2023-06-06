// Garden Gnome Software - Skin
// Pano2VR 6.1.8/17956
// Filename: MapaInter.ggsk
// Generated 2023-06-06T01:26:33

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._map_1=document.createElement('div');
		el.ggFilter = '';
		el.ggFilteredIds = [];
		el.ggMapNotLoaded = true;
		el.ggId="Map 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_map ";
		el.ggType='map';
		hs ='';
		hs+='background : #ffffff;';
		hs+='border : 1px solid #000000;';
		hs+='cursor : pointer;';
		hs+='height : 25%;';
		hs+='left : 15px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 25%;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._map_1.ggUpdateConditionTimer=function () {
			me._map_1.ggRadar.update();
		}
		me._map_1.ggUpdatePosition=function (useTransition) {
		}
		me._map_1.ggNodeChange=function () {
			if (me._map_1.ggLastActivMarker) {
				if (me._map_1.ggLastActivMarker._div.ggDeactivate) me._map_1.ggLastActivMarker._div.ggDeactivate();
			}
			var id=player.getCurrentNode();
			if (me.ggMarkerArray) {
			var marker=me._map_1.ggMarkerArray[id];
			if (marker) {
				if (marker._div.ggActivate) marker._div.ggActivate();
			}
			me._map_1.ggLastActivMarker=marker;
			}
			if (!me._map_1.ggMapNotLoaded) {
				me._map_1.ggCenterNode();
			}
			if (player.getMapType(me._map_1.ggMapId) == 'file') {
				var coords = player.getNodeMapCoords(id, me._map_1.ggMapId);
				if (coords.length < 2) {
					var mapId = player.getMapContainingNode(id);
					if (mapId != '') {
							me._map_1.ggChangeMap(mapId);
					}
				}
			}
			me._map_1.ggLastNodeId = id;
		}
		me.divSkin.appendChild(me._map_1);
		me._map_1.ggMarkerInstances=[];
		me._map_1.ggMapId = 'Lugar';
		me._map_1.ggLastNodeId=null;
		me._map_1.callChildLogicBlocksHotspot_map_pin_changenode = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_active && me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling) {
						me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_scaling();
					}
					if (me._map_1.ggMarkerInstances[i]._map_pin_normal && me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling) {
						me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_scaling();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_active = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_active && me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_active.logicBlock_alpha();
					}
					if (me._map_1.ggMarkerInstances[i]._map_pin_normal && me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_normal.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_position();
					}
				}
			}
		}
		me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged = function(){
			if(me._map_1.ggMarkerInstances) {
				var i;
				for(i = 0; i < me._map_1.ggMarkerInstances.length; i++) {
					if (me._map_1.ggMarkerInstances[i]._map_pin_tt && me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha) {
						me._map_1.ggMarkerInstances[i]._map_pin_tt.logicBlock_alpha();
					}
				}
			}
		}
		me._map_1.ggMarkerArray=[];
		me._map_1.ggGoogleMarkerArray=[];
		me._map_1.ggLastZoom = -1;
		me._map_1.ggRadar={ lastFov : -1, lastPan : -1, lastZoom : -1,activeNodeLatLng : null, poly : null }
		me._map_1.ggRadar.update=function() {
			var radar=me._map_1.ggRadar;
			var map=me._map_1.ggMap;
			if (!map) return;
			var d2r = Math.PI/180 ;
			var r2d = 180/Math.PI ;
			var fov = player.getFov();
			var pan = player.getPanNorth();
			var zoom = map.getZoom();
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
				pan -= me._map_1.ggFloorplanNorth;
			}
			var filterpassed = true;
			var currentId = player.getCurrentNode();
			if (me._map_1.ggFilteredIds.length > 0 && me._map_1.ggFilteredIds.indexOf(currentId) == -1) filterpassed = false;
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0)) && filterpassed) {
				if (zoom<6) zoom = 6; // avoid large radar beams on world map
				if ((radar.poly) && (fov==radar.lastFov) && (pan==radar.lastPan) && (zoom==radar.lastZoom) && (gps[0]==radar.activeNodeLatLng.lat) && (gps[1]==radar.activeNodeLatLng.lng)) return; 
				radar.lastPan=pan;radar.lastFov=fov;radar.lastZoom=zoom;
				radar.activeNodeLatLng = L.latLng(gps[0], gps[1]);
				var tileDeg = 360.0 / Math.pow(2, zoom);
				var rLng = tileDeg * 0.976563;
				var rLat = rLng * Math.cos(radar.activeNodeLatLng.lat * d2r);
				var radar_path = [];
				radar_path.push(radar.activeNodeLatLng);
				var segments=5;
				for (i=-segments; i<=segments; i++) {
					var angle = (fov / (2*segments)) * i;
					var x = -rLng * Math.sin((pan+angle)*d2r) + radar.activeNodeLatLng.lng;
					var y =  rLat * Math.cos((pan+angle)*d2r) + radar.activeNodeLatLng.lat;
					radar_path.push(L.latLng(y, x));
				}
				if (radar.poly) {
					radar.poly.removeFrom(map);
					radar.poly = null;
				}
				radar.poly = L.polygon(radar_path, {
					color: '#ff0000',
					opacity: 0.8,
					weight: 1,
					fill: true,
					fillColor: '#ff0000',
					fillOpacity: 0.35
				}).addTo(map);
			} else {
				if (radar) {
					activeNodeLatLng = L.latLng(0,0);
					if (radar.poly) {
						radar.poly.removeFrom(map);
						radar.poly = null;
					}
				}
			}
		}
		me._map_1.ggTileAvailable=function(x, y, z) {
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (z < 7 || z > 7 + (mapDetails['zoomlevels'] - 1)) return false;
			var mapAR = mapDetails['width'] / mapDetails['height'];
			if (mapDetails['width'] >= mapDetails['height']) {
			var tilesInX = Math.pow(2, z - 7);
			var tilesInY = Math.ceil(tilesInX / mapAR);
			} else {
				var tilesInY = Math.pow(2, z - 7);
				var tilesInX = Math.ceil(tilesInY * mapAR);
			}
			var tilesXStart = Math.pow(2, z - 1);
			var tilesYStart = tilesXStart;
			var tilesXEnd = tilesXStart + tilesInX - 1;
			var tilesYEnd = tilesYStart + tilesInY - 1;
			if (x < tilesXStart || x > tilesXEnd || y < tilesYStart || y > tilesYEnd) return false;
			return true;
		}
		me._map_1.ggInitMap=function(keepZoom) {
			me._map_1.ggMapNotLoaded = false;
			var mapType = player.getMapType(me._map_1.ggMapId);
			var mapDetails = player.getMapDetails(me._map_1.ggMapId);
			if (mapType == 'file') {
				me._map_1.style.backgroundColor = mapDetails['bgcolor'];
				me._map_1.ggFloorplanNorth = mapDetails['floorplannorth'];
			} else {
				me._map_1.style.backgroundColor = '#fff';
			}
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				activeNodeLatLng = L.latLng(gps[0], gps[1]);
			} else {
				activeNodeLatLng = L.latLng(0,0);
			}
			if (mapType == 'web') {
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 14;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 14;
				var maxZoom = ((mapDetails['mapprovider'] == 'openstreetmap') && (mapDetails['mapstyle'] == 'outdoors')) ? 17 : 18;
				if (mapDetails['mapprovider'] == 'custom') maxZoom = mapDetails['mapmaxzoom'];
				var mapOptions = {
					zoom: initZoom,
					zoomControl: true,
					attributionControl: false,
					maxZoom: maxZoom
				};
				me._map_1.ggMap = L.map(me._map_1, mapOptions).setView(activeNodeLatLng, initZoom);
				if (mapDetails['mapprovider'] == 'openstreetmap') {
					if (mapDetails['mapstyle'] == 'streets') {
						L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(me._map_1.ggMap);
					} else if (mapDetails['mapstyle'] == 'outdoors') {
						L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{}).addTo(me._map_1.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'mapbox') {
					if (mapDetails['styleurl'] == '') {
						L.tileLayer('https://api.mapbox.com/v4/mapbox.' + mapDetails['mapstyle'] +  '/{z}/{x}/{y}@2x.png?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_1.ggMap);
					} else {
						var styleurlstring = mapDetails['styleurl'];
						styleurlstring = styleurlstring.slice(styleurlstring.indexOf('styles/') + 7);
						L.tileLayer('https://api.mapbox.com/styles/v1/' + styleurlstring + '/tiles/256/{z}/{x}/{y}@2x?access_token=' + mapDetails['mapkey'],{}).addTo(me._map_1.ggMap);
					}
				} else if (mapDetails['mapprovider'] == 'custom') {
					L.tileLayer(mapDetails['mapurltemplate'],{ maxZoom: mapDetails['mapmaxzoom']}).addTo(me._map_1.ggMap);
				}
			} else if (mapType == 'file') {
				if (me._map_1.ggLastZoom == -1) me._map_1.ggLastZoom = 7;
				var initZoom = keepZoom ? me._map_1.ggLastZoom : 7;
				var mapOptions = {
					zoom: initZoom,
					minZoom: 7,
					maxZoom: 7 + (mapDetails['zoomlevels'] - 1) + 0,
					center: activeNodeLatLng,
					zoomControls: true,
					attributionControl: false
				};
				me._map_1.ggMap = L.map(me._map_1, mapOptions).setView(activeNodeLatLng, initZoom);
				var MapLayer = L.TileLayer.extend({
					getTileUrl: function(coords){
						if (me._map_1.ggTileAvailable(coords.x, coords.y, coords.z)) {
							return basePath + 'images/maptiles/' + me._map_1.ggMapId + '/' + coords.z + '/' + coords.x + '_' + coords.y + '.' + mapDetails['tileformat'];
						} else {
							return '';
						}
					}
				});
				var mapLayer = new MapLayer();
				mapLayer.addTo(me._map_1.ggMap);
				me._map_1.ggMap.on('move zoom', function() {
					me._map_1.ggCheckBounds(mapDetails);
				});
				me._map_1.ggCheckBounds(mapDetails);
			}
		}
		me._map_1.ggClearMap=function() {
		if (me._map_1.ggMap) me._map_1.ggMap.remove();
		me._map_1.ggMap = null;
		me._map_1.ggClearMapMarkers();
		me._map_1.ggMapNotLoaded = true;
		}
		me._map_1.ggClearMapMarkers=function() {
			me._map_1.ggLastActivMarker = null;
			var id,marker;
			var markers=me._map_1.ggMarkerArray;
			for (id in markers) {
				if (markers.hasOwnProperty(id)) {
					marker=markers[id];
					marker.removeFrom(me._map_1.ggMap);
				}
			}
			me._map_1.ggMarkerArray=[];
			me._map_1.ggMarkerInstances=[];
			me._map_1.ggLastActivMarker = null;
		}
		me._map_1.ggCenterNode=function() {
			if (!me._map_1.ggMap) return;
			var gps;
			if (player.getMapType(me._map_1.ggMapId) == 'web') {
				gps=player.getNodeLatLng();
			} else {
				gps=player.getNodeMapCoords(null, me._map_1.ggMapId);
			}
			if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
				var markerLocation = L.latLng(gps[0], gps[1]);
				me._map_1.ggMap.panTo(markerLocation, {animate: false});
			}
		}
		me._map_1.ggFitBounds=function(force) {
			if (me._map_1.ggMarkerBounds.isValid()) {
				if (me._map_1.ggMarkerInstances.length > 1 || Object.getOwnPropertyNames(me._map_1.ggGoogleMarkerArray).length > 1) {
					me._map_1.ggMap.zoomOut(1, {animate: false});
					me._map_1.ggMap.fitBounds(me._map_1.ggMarkerBounds, {padding: [30, 30], animate: false});
				} else {
					me._map_1.ggMap.setView(me._map_1.ggMarkerBounds.getCenter(), me._map_1.ggMap.getZoom());
					if (player.getMapType(me._map_1.ggMapId) == 'web') {
						me._map_1.ggMap.setZoom(18);
					} else {
						me._map_1.ggMap.setZoom(7);
					}
				}
			}
		}
		me._map_1.ggInitMapMarkers=function(updateMapBounds) {
			L.SkinMarkerLayer = L.Layer.extend({
				initialize: function(div, pos) {
					this._div = div;
					this._pos = pos;
				},
				onAdd: function(map) {
					this.options.pane = 'markerPane';
					var pane = map.getPane(this.options.pane);
					pane.appendChild(this._div);
					this._div.style.left = -12 + 'px';
					this._div.style.top = -41 + 'px';
					this._update();
					map.on('zoomstart', this._zoomStart, this);
					map.on('zoomend', this._zoomEnd, this);
					map.on('zoomend viewreset', this._update, this);
				},
				onRemove : function(map) {
					L.DomUtil.remove(this._div);
					map.off('zoomend viewreset', this._update, this);
				},
				_zoomStart: function() {
						this._div.style.visibility = 'hidden';
				},
				_zoomEnd: function() {
						this._div.style.visibility = 'inherit';
				},
				_update : function() {
					var point = this._map.latLngToLayerPoint(this._pos);
					L.DomUtil.setPosition(this._div, point);
				}
			});
			me._map_1.ggClearMapMarkers();
			var ids=player.getNodeIds();
			me._map_1.ggFilteredIds = [];
			if (me._map_1.ggFilter != '') {
				var filter = me._map_1.ggFilter.split(',');
				for (i=0; i < ids.length; i++) {
					var nodeId = ids[i];
					var nodeData = player.getNodeUserdata(nodeId);
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) != -1) me._map_1.ggFilteredIds.push(nodeId);
					}
				}
				if (me._map_1.ggFilteredIds.length > 0) ids = me._map_1.ggFilteredIds;
			}
			var marker;
			var markerLocation;
			me._map_1.ggMarkerBounds = L.latLngBounds();
			var currentId = player.getCurrentNode();
			for(var i=0;i<ids.length;i++) {
				var id=ids[i];
				var gps;
				if (player.getMapType(me._map_1.ggMapId) == 'web') {
					gps=player.getNodeLatLng(id);
				} else {
					gps=player.getNodeMapCoords(id, me._map_1.ggMapId);
				}
				if ((gps.length>=2) && ((gps[0]!=0) || (gps[1]!=0))) {
					markerLocation = L.latLng(gps[0], gps[1]);
					var markerParent = new Object();
					markerParent.ggElementNodeId=function() { return id };
					var div=new SkinElement_map_pin_Class(me, markerParent);
					marker=new L.SkinMarkerLayer(div._map_pin,markerLocation);
					marker.addTo(me._map_1.ggMap);
					me._map_1.ggMarkerArray[id]=marker;
					me._map_1.ggMarkerInstances.push(div);
					me._map_1.ggMarkerBounds.extend(markerLocation);
				}
			}
			if (ids.length > 1 && me._map_1.ggMarkerBounds.isValid() && updateMapBounds) {
				me._map_1.ggFitBounds(false);
			}
			skin.updateSize(me._map_1);
		me._map_1.callChildLogicBlocksHotspot_map_pin_changenode();
		me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded();
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover();
		me._map_1.callChildLogicBlocksHotspot_map_pin_active();
		me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch();
		me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged();
			this.ggLastActivMarker = null;
			if (this.ggUpdateConditionNodeChange) this.ggUpdateConditionNodeChange();
			this.ggRadar.lastFov = -1;
		}
		me._map_1.ggChangeMap=function(mapId) {
			var newMapType = player.getMapType(mapId)
			if (newMapType == 'web') {
				return;
			}
			if (me._map_1.ggMap) {
				me._map_1.ggLastZoom = me._map_1.ggMap.getZoom();
			}
			me._map_1.ggMapId = mapId;
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(true);
			me._map_1.ggInitMapMarkers(false);
		var mapDetails = player.getMapDetails(me._map_1.ggMapId);
		me._map_1.ggCheckBounds(mapDetails);
		}
		me._map_1.ggInCheckBounds=false;
		me._map_1.ggCheckBounds=function(mapDetails) {
			var mapAR = mapDetails['width'] / mapDetails['height'];
			var tileInDeg = 360.0 / Math.pow(2, 7);
			if (mapDetails['width'] >= mapDetails['height']) {
				var tmpWidth = mapDetails['width'];
				while (tmpWidth > 256) {
					tmpWidth /= 2;
				}
				var mapWidthInDeg = tileInDeg * (tmpWidth / 256);
			var mapHeightInDeg = mapWidthInDeg / mapAR;
			} else {
				var tmpHeight = mapDetails['height'];
				while (tmpHeight > 256) {
					tmpHeight /= 2;
				}
				var mapHeightInDeg = tileInDeg * (tmpHeight / 256);
				var mapWidthInDeg = mapHeightInDeg * mapAR;
			}
			if (me._map_1.ggInCheckBounds) return;
			me._map_1.ggInCheckBounds = true;
			var mapCenter = me._map_1.ggMap.getCenter();
			var currentZoom = me._map_1.ggMap.getZoom();
			var pixelInDeg = 360.0 / (Math.pow(2, currentZoom) * 256)
			var xOffset = (me._map_1.clientWidth / 2.0) * pixelInDeg;
			var yOffset = (me._map_1.clientHeight / 2.0) * pixelInDeg;
			var x = mapCenter.lng;
			var y = mapCenter.lat;
			if (mapWidthInDeg < me._map_1.clientWidth * pixelInDeg) {
				x = mapWidthInDeg / 2;
			} else {
			if (x > mapWidthInDeg - xOffset) x = mapWidthInDeg - xOffset;
			if (x < xOffset) x = xOffset;
			}
			if (mapHeightInDeg < me._map_1.clientHeight * pixelInDeg) {
				y = -mapHeightInDeg / 2;
			} else {
			if (y < -mapHeightInDeg + yOffset) y = -mapHeightInDeg + yOffset;
			if (y > -yOffset) y = -yOffset;
			}
			var newCenter = L.latLng(y, x);
			me._map_1.ggMap.setView(newCenter, me._map_1.ggMap.getZoom(), {animate: false});
			me._map_1.ggInCheckBounds = false;
		}
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
		player.addListener('configloaded', function() {
			me._map_1.ggClearMap();
			me._map_1.ggInitMap(false);
			me._map_1.ggInitMapMarkers(true);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._map_1.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinElement_map_pin_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._map_pin=document.createElement('div');
		el.ggId="map_pin";
		el.ggDx=-286;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 284px;';
		hs+='height : 41px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 24px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._map_pin.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.ggNodeId;
		}
		me._map_pin.onclick=function (e) {
			if (
				(
					((me._map_pin.ggIsActive() == false))
				)
			) {
				player.openNext("{"+me.ggNodeId+"}","");
			}
		}
		me._map_pin.onmouseover=function (e) {
			me.elementMouseOver['map_pin']=true;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.onmouseout=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ontouchend=function (e) {
			me.elementMouseOver['map_pin']=false;
			me._map_pin_tt.logicBlock_alpha();
		}
		me._map_pin.ggUpdatePosition=function (useTransition) {
		}
		el=me._map_pin_active=document.createElement('div');
		els=me._map_pin_active__img=document.createElement('img');
		els.className='ggskin ggskin_map_pin_active';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_active";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : -1px;';
		hs+='cursor : pointer;';
		hs+='height : 41px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='visibility : hidden;';
		hs+='width : 24px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._map_pin_active.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_active.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_active'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_active.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateScaling == 0) {
					me._map_pin_active.ggParameter.sx = 1.1;
					me._map_pin_active.ggParameter.sy = 1.1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
				else {
					me._map_pin_active.ggParameter.sx = 1;
					me._map_pin_active.ggParameter.sy = 1;
					me._map_pin_active.style[domTransform]=parameterToTransform(me._map_pin_active.ggParameter);
				}
			}
		}
		me._map_pin_active.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_active.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_active.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_active.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_active.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_active.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_active.style.visibility=me._map_pin_active.ggVisible?'inherit':'hidden';
					me._map_pin_active.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_active.style.opacity == 0.0) { me._map_pin_active.style.visibility="hidden"; } }, 505);
					me._map_pin_active.style.opacity=0;
				}
			}
		}
		me._map_pin_active.onmouseover=function (e) {
			me.elementMouseOver['map_pin_active']=true;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.onmouseout=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ontouchend=function (e) {
			me.elementMouseOver['map_pin_active']=false;
			me._map_pin_active.logicBlock_scaling();
		}
		me._map_pin_active.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_active);
		el=me._map_pin_normal=document.createElement('div');
		els=me._map_pin_normal__img=document.createElement('img');
		els.className='ggskin ggskin_map_pin_normal';
		hs='data:image/png;base64,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';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="map_pin_normal";
		el.ggDx=1;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : -9px;';
		hs+='cursor : pointer;';
		hs+='height : 40px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 42px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		me._map_pin_normal.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_normal.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['map_pin_normal'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._map_pin_normal.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateScaling == 0) {
					me._map_pin_normal.ggParameter.sx = 1.1;
					me._map_pin_normal.ggParameter.sy = 1.1;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
				else {
					me._map_pin_normal.ggParameter.sx = 1;
					me._map_pin_normal.ggParameter.sy = 1;
					me._map_pin_normal.style[domTransform]=parameterToTransform(me._map_pin_normal.ggParameter);
				}
			}
		}
		me._map_pin_normal.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me._map_pin_normal.ggIsActive() == true))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_normal.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_normal.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_normal.style[domTransition]='' + cssPrefix + 'transform 200ms ease 0ms, opacity 500ms ease 0ms';
				if (me._map_pin_normal.ggCurrentLogicStateAlpha == 0) {
					setTimeout(function() { if (me._map_pin_normal.style.opacity == 0.0) { me._map_pin_normal.style.visibility="hidden"; } }, 505);
					me._map_pin_normal.style.opacity=0;
				}
				else {
					me._map_pin_normal.style.visibility=me._map_pin_normal.ggVisible?'inherit':'hidden';
					me._map_pin_normal.style.opacity=1;
				}
			}
		}
		me._map_pin_normal.onmouseover=function (e) {
			me.elementMouseOver['map_pin_normal']=true;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.onmouseout=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ontouchend=function (e) {
			me.elementMouseOver['map_pin_normal']=false;
			me._map_pin_normal.logicBlock_scaling();
		}
		me._map_pin_normal.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._map_pin.appendChild(me._map_pin_normal);
		el=me._map_pin_tt=document.createElement('div');
		els=me._map_pin_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="map_pin_tt";
		el.ggDx=0;
		el.ggDy=38;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #ffffff;';
		hs+='border: 0px solid #000000;';
		hs+='border-radius: 10px;';
		hs+=cssPrefix + 'border-radius: 10px;';
		hs+='color: #000000;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.ggUserdata.title;
		el.appendChild(els);
		me._map_pin_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._map_pin_tt.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getHasTouch() == true))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._map_pin_tt.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._map_pin_tt.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					this.ggDy = -38;
					me._map_pin_tt.ggUpdatePosition(true);
				}
				else {
					me._map_pin_tt.ggDx=0;
					me._map_pin_tt.ggDy=38;
					me._map_pin_tt.ggUpdatePosition(true);
				}
			}
		}
		me._map_pin_tt.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				((me.elementMouseOver['map_pin'] == true)) && 
				((me.ggUserdata.title != ""))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._map_pin_tt.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._map_pin_tt.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._map_pin_tt.style[domTransition]='left 0s, top 0s, opacity 500ms ease 0ms';
				if (me._map_pin_tt.ggCurrentLogicStateAlpha == 0) {
					me._map_pin_tt.style.visibility=me._map_pin_tt.ggVisible?'inherit':'hidden';
					me._map_pin_tt.style.opacity=1;
				}
				else {
					setTimeout(function() { if (me._map_pin_tt.style.opacity == 0.0) { me._map_pin_tt.style.visibility="hidden"; } }, 505);
					me._map_pin_tt.style.opacity=0;
				}
			}
		}
		me._map_pin_tt.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._map_pin.appendChild(me._map_pin_tt);
	};
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	player.addListener('changenode', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_changenode(); });
	player.addListener('configloaded', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_configloaded(); });
	player.addListener('mouseover', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('mouseover', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_mouseover(); });
	player.addListener('changenode', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_active(); });
	player.addListener('hastouch', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_hastouch(); });
	player.addListener('activehotspotchanged', function(args) { me._map_1.callChildLogicBlocksHotspot_map_pin_activehotspotchanged(); });
	me.skinTimerEvent();
};