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
		<img src="/assets/{$desarrollo}/loteador.png" orgwidth="4656" width="500" border="0" usemap="#map" class="map" />
		<map name="map">
			<area shape="poly" coords="3648,65,3809,649,3598,701,3439,125" alt="1" target="OLMOS_1" href="#" />
			<area shape="poly" coords="3439,125,3599,702,3384,753,3229,187" alt="2" target="OLMOS_2" href="#" />
			<area shape="poly" coords="3229,187,3384,755,3171,807,3019,248" alt="3" target="OLMOS_3" href="#" />
			<area shape="poly" coords="3019,248,3172,808,2959,858,2809,307" alt="4" target="OLMOS_4" href="#" />
			<area shape="poly" coords="2809,307,2959,858,2745,909,2599,367" alt="5" target="OLMOS_5" href="#" />
			<area shape="poly" coords="2600,367,2746,910,2533,960,2388,426" alt="6" target="OLMOS_6" href="#" />
			<area shape="poly" coords="2389,426,2533,961,2320,1012,2178,483" alt="7" target="OLMOS_7" href="#" />
			<area shape="poly" coords="2178,483,2321,1013,2108,1063,1968,541" alt="8" target="OLMOS_8" href="#" />
			<area shape="poly" coords="1968,541,2109,1063,1895,1113,1758,599" alt="9" target="OLMOS_9" href="#" />
			<area shape="poly" coords="1757,599,1896,1113,1683,1163,1548,656" alt="10" target="OLMOS_10" href="#" />
			<area shape="poly" coords="1547,656,1684,1164,1471,1214,1337,713" alt="11" target="OLMOS_11" href="#" />
			<area shape="poly" coords="1337,713,1471,1214,1260,1265,1126,770" alt="12" target="OLMOS_12" href="#" />
			<area shape="poly" coords="1126,770,1321,1489,1019,1560,803,857" alt="13" target="OLMOS_13" href="#" />
			<area shape="poly" coords="1019,1560,1531,1440,1597,1645,1100,1810" alt="14" target="OLMOS_14" href="#" />
			<area shape="poly" coords="1099,1809,1597,1643,1660,1843,1165,2008" alt="15" target="OLMOS_15" href="#" />
			<area shape="poly" coords="1165,2008,1660,1842,1726,2043,1229,2207" alt="16" target="OLMOS_16" href="#" />
			<area shape="poly" coords="1273,2193,1729,2040,1763,2152,1716,2181,1658,2233,1613,2291,1569,2369,1548,2441,1524,2542,1483,2605,1420,2649" alt="17" target="OLMOS_17" href="#" />
		</map>
	</xsl:template>
</xsl:stylesheet>