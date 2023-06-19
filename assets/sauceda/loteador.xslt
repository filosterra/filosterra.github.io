<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:param name="desarrollo">(location.hash || '').replace(/^#/,'')</xsl:param>
	<xsl:template match="/">
		<script type="text/javascript" src="jquery.maphilight.js"></script>
		<script type="text/javascript" src="mapselection.js?v=20230601">loteador.inicializar()</script>
		<style>
			<![CDATA[
#Mapa .map {
	background: url('/assets/]]><xsl:value-of select="$desarrollo"/><![CDATA[/loteador.png');
	background-size: 100%;
	background-repeat: no-repeat;
	width: 100%;
}
]]>
		</style>
		<img src="/assets/{$desarrollo}/loteador.png" orgwidth="3800" width="500" border="0" usemap="#map" class="map" />
		<map name="map">
			<area shape="poly" coords="314,779,454,739,534,1007,381,1032" alt="32" target="SAUCEDA_32" href="#" />
			<area shape="poly" coords="534,1007,454,739,598,700,680,979" alt="31" target="SAUCEDA_31" href="#" />
			<area shape="poly" coords="597,699,740,661,825,948,680,979" alt="30" target="SAUCEDA_30" href="#" />
			<area shape="poly" coords="825,947,969,912,882,620,740,659" alt="29" target="SAUCEDA_29" href="#" />
			<area shape="poly" coords="969,912,1113,874,1025,581,883,620" alt="28" target="SAUCEDA_28" href="#" />
			<area shape="poly" coords="1113,873,1255,832,1167,542,1025,579" alt="27" target="SAUCEDA_27" href="#" />
			<area shape="poly" coords="1255,832,1396,787,1309,504,1167,542" alt="26" target="SAUCEDA_26" href="#" />
			<area shape="poly" coords="1527,741,1442,466,1309,503,1396,787" alt="25" target="SAUCEDA_25" href="#" />
			<area shape="poly" coords="1575,430,1656,692,1527,741,1442,466" alt="24" target="SAUCEDA_24" href="#" />
			<area shape="poly" coords="1785,637,1708,394,1575,430,1656,692,1723,666" alt="23" target="SAUCEDA_23" href="#" />
			<area shape="poly" coords="1919,579,1850,357,1818,362,1708,393,1784,638" alt="22" target="SAUCEDA_22" href="#" />
			<area shape="poly" coords="2073,519,2012,326,1850,357,1919,579" alt="21" target="SAUCEDA_21" href="#" />
			<area shape="poly" coords="2251,459,2198,291,2012,326,2073,519,2167,485" alt="20" target="SAUCEDA_20" href="#" />
			<area shape="poly" coords="2456,402,2407,252,2197,291,2251,459,2327,436" alt="19" target="SAUCEDA_19" href="#" />
			<area shape="poly" coords="2684,355,2635,206,2407,252,2456,402" alt="18" target="SAUCEDA_18" href="#" />
			<area shape="poly" coords="2915,323,2876,160,2635,206,2684,355" alt="17-d" target="SAUCEDA_17d" href="#" />
			<area shape="poly" coords="3138,292,3096,120,2876,160,2915,323" alt="17-c" target="SAUCEDA_17c" href="#" />
			<area shape="poly" coords="3376,260,3330,75,3096,121,3138,293" alt="17-b" target="SAUCEDA_17b" href="#" />
			<area shape="poly" coords="3593,229,3530,35,3330,74,3376,260" alt="17-a" target="SAUCEDA_17a" href="#" />
			<area shape="poly" coords="3672,426,3745,609,3568,640,3524,446" alt="17" target="SAUCEDA_17" href="#" />
			<area shape="poly" coords="3524,446,3358,469,3402,668,3568,640" alt="16" target="SAUCEDA_16" href="#" />
			<area shape="poly" coords="3357,469,3197,491,3236,696,3402,669" alt="15" target="SAUCEDA_15" href="#" />
			<area shape="poly" coords="3197,490,2998,518,3037,731,3236,696" alt="14" target="SAUCEDA_14" href="#" />
			<area shape="poly" coords="2998,517,2793,545,2850,762,3037,731" alt="13" target="SAUCEDA_13" href="#" />
			<area shape="poly" coords="2793,545,2606,580,2663,793,2850,762" alt="12" target="SAUCEDA_12" href="#" />
			<area shape="poly" coords="2606,580,2422,625,2475,825,2663,794" alt="11" target="SAUCEDA_11" href="#" />
			<area shape="poly" coords="2422,625,2237,681,2283,857,2475,825" alt="10" target="SAUCEDA_10" href="#" />
			<area shape="poly" coords="2237,681,2062,744,2042,758,2031,774,2025,792,2026,813,2045,897,2283,857" alt="9" target="SAUCEDA_9" href="#" />
			<area shape="poly" coords="2039,868,2047,908,2031,910,2080,1291,1545,1351,1516,1077,1624,1040,1729,1001,1851,952" alt="8" target="SAUCEDA_8" href="#" />
			<area shape="poly" coords="1416,1365,1545,1351,1508,1001,1502,993,1491,986,1477,983,1462,984,1372,1014" alt="7" target="SAUCEDA_7" href="#" />
			<area shape="poly" coords="1372,1014,1236,1056,1276,1380,1416,1365" alt="6" target="SAUCEDA_6" href="#" />
			<area shape="poly" coords="1236,1056,1100,1094,1136,1394,1276,1380" alt="5" target="SAUCEDA_5" href="#" />
			<area shape="poly" coords="1100,1094,963,1130,996,1408,1136,1394" alt="4" target="SAUCEDA_4" href="#" />
			<area shape="poly" coords="963,1130,809,1166,839,1424,996,1408" alt="3" target="SAUCEDA_3" href="#" />
			<area shape="poly" coords="809,1166,643,1200,671,1441,839,1424" alt="2" target="SAUCEDA_2" href="#" />
			<area shape="poly" coords="643,1200,470,1230,493,1460,671,1441" alt="1" target="SAUCEDA_1" href="#" />
		</map>
	</xsl:template>
</xsl:stylesheet>