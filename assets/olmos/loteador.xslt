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
			<area shape="poly" coords="703,2941,255,3094,246,3106,525,3866,1179,3456,1049,3244,1017,3267,977,3287,942,3298,887,3304,842,3297,803,3285,762,3261,731,3238,709,3209,689,3182,674,3146,663,3103,661,3048,682,2975" alt="18" target="OLMOS_18" href="#" />
			<area shape="poly" coords="1050,3244,1180,3456,1697,3133,1546,2891,1498,2913,1438,2933,1383,2952,1331,2969,1267,2990,1212,3009,1155,3028,1134,3035,1126,3050,1125,3078,1124,3110,1113,3147,1093,3191" alt="19" target="OLMOS_19" href="#" />
			<area shape="poly" coords="1698,3132,2111,2874,1842,2445,1825,2473,1809,2541,1799,2584,1780,2642,1752,2698,1714,2755,1673,2801,1626,2842,1589,2869,1546,2891" alt="20" target="OLMOS_20" href="#" />
			<area shape="poly" coords="2113,2874,1841,2445,1872,2409,1926,2373,2019,2312,2296,2758" alt="21" target="OLMOS_21" href="#" />
			<area shape="poly" coords="2296,2758,2018,2313,2201,2193,2481,2643" alt="22" target="OLMOS_22" href="#" />
			<area shape="poly" coords="2481,2642,2200,2193,2382,2074,2665,2528" alt="23" target="OLMOS_23" href="#" />
			<area shape="poly" coords="2665,2524,2383,2075,2567,1953,2851,2413" alt="24" target="OLMOS_24" href="#" />
			<area shape="poly" coords="2851,2413,3036,2295,2748,1835,2566,1954" alt="25" target="OLMOS_25" href="#" />
			<area shape="poly" coords="2749,1835,3037,2297,3223,2179,2932,1715" alt="26" target="OLMOS_26" href="#" />
			<area shape="poly" coords="2932,1715,3224,2181,3407,2064,3115,1594" alt="27" target="OLMOS_27" href="#" />
			<area shape="poly" coords="3115,1594,3407,2065,3595,1949,3298,1474" alt="28" target="OLMOS_28" href="#" />
			<area shape="poly" coords="3298,1474,3595,1949,3779,1830,3481,1352" alt="29" target="OLMOS_29" href="#" />
			<area shape="poly" coords="3481,1352,3779,1831,3964,1715,3666,1231" alt="30" target="OLMOS_30" href="#" />
			<area shape="poly" coords="3666,1230,3966,1715,4152,1595,3850,1112" alt="31" target="OLMOS_31" href="#" />
			<area shape="poly" coords="3850,1112,4153,1596,4389,1446,4203,1150,4153,1178,4039,998" alt="32" target="OLMOS_32" href="#" />
			<area shape="poly" coords="2030,2028,3454,1089,3463,1076,3468,1052,3464,1029,3455,1013,3433,1000,3409,992,3394,993,1812,1372,1793,1380,1778,1403,1772,1423,1773,1439,1956,1999,1971,2019,1996,2031" alt="33" target="OLMOS_33" href="#" />
			<area shape="poly" coords="3649,63,3703,49,3776,152,3964,524,3963,557,3929,593,3852,636,3810,649" alt="34" target="OLMOS_34" href="#" />
			<area shape="poly" coords="4037,996,4154,1181,4203,1150,4389,1445,4501,1377,4196,860,4050,952,4043,978,4035,992" alt="35" target="OLMOS_35" href="#" />
		</map>
	</xsl:template>
</xsl:stylesheet>