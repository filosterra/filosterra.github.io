<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:state="http://panax.io/state">
	<xsl:param name="state:desarrollo">(xover.site.seed || '').replace(/^#/,'')</xsl:param>
	<xsl:template match="/">
		<div>
			<script type="text/javascript" defer="defer" src="./jquery.maphilight.js"></script>
			<script type="text/javascript" src="./mapselection.js">loteador.inicializar()</script>
			<style>
				<![CDATA[
#Mapa .map {
	background: url('/assets/desarrollos/]]><xsl:value-of select="$state:desarrollo"/><![CDATA[/loteador.png');
	background-size: 100%;
	background-repeat: no-repeat;
	width: 100%;
	mask-image: linear-gradient(black 90%, transparent);
}
]]>
			</style>
			<img src="/assets/desarrollos/{$state:desarrollo}/loteador.jpg" orgwidth="8000" width="4500" border="0" usemap="#map" class="map" />
			<map name="map">
				<area shape="poly" coords="6393,3720,6391,3489,6626,3489,6625,3431,6902,3428,7117,3711" alt="1" target="zarzuela_1" href="#" />
				<area shape="poly" coords="6269,3721,6392,3719,6393,3430,6265,3431" alt="2" target="zarzuela_2" href="#" />
				<area shape="poly" coords="6265,3431,6269,3720,6140,3721,6137,3432" alt="3" target="zarzuela_3" href="#" />
				<area shape="poly" coords="6137,3433,6140,3722,6011,3723,6008,3434" alt="4" target="zarzuela_4" href="#" />
				<area shape="poly" coords="6008,3434,6011,3723,5883,3724,5880,3435" alt="5" target="zarzuela_5" href="#" />
				<area shape="poly" coords="5880,3435,5883,3724,5755,3725,5752,3437" alt="6" target="zarzuela_6" href="#" />
				<area shape="poly" coords="5752,3437,5755,3725,5626,3727,5624,3438" alt="7" target="zarzuela_7" href="#" />
				<area shape="poly" coords="5624,3438,5626,3727,5498,3728,5496,3440" alt="8" target="zarzuela_8" href="#" />
				<area shape="poly" coords="5497,3439,5498,3728,5370,3730,5368,3440" alt="9" target="zarzuela_9" href="#" />
				<area shape="poly" coords="5368,3440,5370,3729,5241,3731,5238,3442" alt="10" target="zarzuela_10" href="#" />
				<area shape="poly" coords="5238,3442,5241,3731,5112,3732,5110,3443" alt="11" target="zarzuela_11" href="#" />
				<area shape="poly" coords="5110,3443,5112,3732,4985,3733,4981,3445" alt="12" target="zarzuela_12" href="#" />
				<area shape="poly" coords="4981,3445,4985,3733,4856,3735,4854,3446" alt="13" target="zarzuela_13" href="#" />
				<area shape="poly" coords="4854,3446,4856,3734,4729,3736,4725,3447" alt="14" target="zarzuela_14" href="#" />
				<area shape="poly" coords="4725,3447,4728,3736,4601,3737,4597,3448" alt="15" target="zarzuela_15" href="#" />
				<area shape="poly" coords="4597,3448,4602,3737,4472,3738,4469,3450" alt="16" target="zarzuela_16" href="#" />
				<area shape="poly" coords="4469,3450,4472,3739,4343,3740,4341,3452" alt="17" target="zarzuela_17" href="#" />
				<area shape="poly" coords="4341,3452,4343,3740,4214,3741,4213,3452" alt="18" target="zarzuela_18" href="#" />
				<area shape="poly" coords="4213,3452,4214,3741,4086,3742,4083,3453" alt="19" target="zarzuela_19" href="#" />
				<area shape="poly" coords="4083,3453,4087,3742,3957,3743,3955,3455" alt="20" target="zarzuela_20" href="#" />
				<area shape="poly" coords="3955,3455,3957,3744,3829,3745,3827,3456" alt="21" target="zarzuela_21" href="#" />
				<area shape="poly" coords="3827,3456,3829,3745,3702,3746,3698,3457" alt="22" target="zarzuela_22" href="#" />
				<area shape="poly" coords="3698,3457,3702,3746,3573,3747,3570,3458" alt="23" target="zarzuela_23" href="#" />
				<area shape="poly" coords="3570,3458,3573,3748,3445,3749,3442,3460" alt="24" target="zarzuela_24" href="#" />
				<area shape="poly" coords="3442,3460,3446,3749,3317,3750,3314,3462" alt="25" target="zarzuela_25" href="#" />
				<area shape="poly" coords="3314,3462,3317,3750,3187,3751,3185,3463" alt="26" target="zarzuela_26" href="#" />
				<area shape="poly" coords="3185,3463,3187,3751,3060,3753,3056,3466" alt="27" target="zarzuela_27" href="#" />
				<area shape="poly" coords="3057,3466,3060,3753,2931,3754,2929,3466" alt="28" target="zarzuela_28" href="#" />
				<area shape="poly" coords="2929,3466,2931,3754,2803,3755,2800,3468" alt="29" target="zarzuela_29" href="#" />
				<area shape="poly" coords="2800,3468,2803,3755,2675,3757,2671,3470" alt="30" target="zarzuela_30" href="#" />
				<area shape="poly" coords="2671,3470,2675,3757,2546,3758,2544,3469" alt="31" target="zarzuela_31" href="#" />
				<area shape="poly" coords="2545,3470,2546,3758,2418,3759,2415,3471" alt="32" target="zarzuela_32" href="#" />
				<area shape="poly" coords="2415,3471,2418,3759,2289,3760,2287,3473" alt="33" target="zarzuela_33" href="#" />
				<area shape="poly" coords="2287,3473,2289,3760,2162,3762,2158,3474" alt="34" target="zarzuela_34" href="#" />
				<area shape="poly" coords="2158,3474,2162,3762,2033,3763,2030,3475" alt="35" target="zarzuela_35" href="#" />
				<area shape="poly" coords="2030,3475,2033,3763,1904,3764,1902,3476" alt="36" target="zarzuela_36" href="#" />
				<area shape="poly" coords="1903,3476,1904,3764,1776,3766,1774,3477" alt="37" target="zarzuela_37" href="#" />
				<area shape="poly" coords="1774,3477,1776,3766,1648,3767,1645,3479" alt="38" target="zarzuela_38" href="#" />
				<area shape="poly" coords="1645,3479,1648,3767,1494,3769,1493,3575,1511,3572,1530,3565,1546,3556,1562,3547,1574,3537,1588,3524,1598,3512,1608,3496,1615,3480" alt="39" target="zarzuela_39" href="#" />
				<area shape="poly" coords="1493,3575,1494,3769,1186,3772,1375,3544,1397,3558,1414,3565,1428,3570,1447,3575,1472,3576" alt="40" target="zarzuela_40" href="#" />
				<area shape="poly" coords="1375,3544,1186,3771,960,3772,1052,3543,1319,3425,1319,3447,1322,3463,1328,3478,1335,3495,1347,3512,1358,3525,1374,3543" alt="41" target="zarzuela_41" href="#" />
				<area shape="poly" coords="1318,3426,1052,3543,1193,3191,1414,3279,1386,3293,1365,3311,1347,3332,1335,3352,1323,3380,1319,3404" alt="42" target="zarzuela_42" href="#" />
				<area shape="poly" coords="1413,3280,1193,3191,1240,3070,1506,3177,1472,3264,1447,3269,1429,3273" alt="43" target="zarzuela_43" href="#" />
				<area shape="poly" coords="1240,3070,1506,3177,1554,3058,1288,2952" alt="44" target="zarzuela_44" href="#" />
				<area shape="poly" coords="1288,2952,1554,3058,1601,2939,1335,2832" alt="45" target="zarzuela_45" href="#" />
				<area shape="poly" coords="1335,2832,1382,2714,1650,2820,1602,2939" alt="46" target="zarzuela_46" href="#" />
				<area shape="poly" coords="1649,2820,1383,2715,1430,2594,1697,2701" alt="47" target="zarzuela_47" href="#" />
				<area shape="poly" coords="1697,2701,1430,2594,1478,2476,1745,2582" alt="48" target="zarzuela_48" href="#" />
				<area shape="poly" coords="1745,2582,1478,2476,1525,2355,1793,2462" alt="49" target="zarzuela_49" href="#" />
				<area shape="poly" coords="1792,2462,1526,2356,1574,2236,1840,2343" alt="50" target="zarzuela_50" href="#" />
				<area shape="poly" coords="1840,2343,1574,2236,1620,2119,1888,2224" alt="51" target="zarzuela_51" href="#" />
				<area shape="poly" coords="1888,2223,1620,2119,1668,1998,1935,2105" alt="52" target="zarzuela_52" href="#" />
				<area shape="poly" coords="1935,2105,1669,1998,1688,1945,2062,1791" alt="53" target="zarzuela_53" href="#" />
				<area shape="poly" coords="2135,1608,2235,1355,2246,1341,2256,1333,2267,1326,2280,1322,2370,1324,2366,1611" alt="54" target="zarzuela_54" href="#" />
				<area shape="poly" coords="2366,1611,2370,1324,2498,1326,2494,1613" alt="55" target="zarzuela_55" href="#" />
				<area shape="poly" coords="2494,1613,2498,1325,2626,1327,2622,1614" alt="56" target="zarzuela_56" href="#" />
				<area shape="poly" coords="2622,1614,2626,1327,2754,1328,2750,1616" alt="57" target="zarzuela_57" href="#" />
				<area shape="poly" coords="2750,1616,2754,1328,2882,1330,2879,1617" alt="58" target="zarzuela_58" href="#" />
				<area shape="poly" coords="2879,1617,2882,1330,3010,1332,3007,1619" alt="59" target="zarzuela_59" href="#" />
				<area shape="poly" coords="3007,1619,3010,1332,3138,1332,3136,1621" alt="60" target="zarzuela_60" href="#" />
				<area shape="poly" coords="3136,1621,3138,1333,3268,1334,3264,1622" alt="61" target="zarzuela_61" href="#" />
				<area shape="poly" coords="3264,1622,3268,1335,3396,1336,3393,1624" alt="62" target="zarzuela_62" href="#" />
				<area shape="poly" coords="3393,1624,3396,1336,3524,1338,3521,1625" alt="63" target="zarzuela_63" href="#" />
				<area shape="poly" coords="3521,1625,3523,1338,3653,1340,3649,1627" alt="64" target="zarzuela_64" href="#" />
				<area shape="poly" coords="3649,1627,3653,1339,3806,1341,3803,1629" alt="65" target="zarzuela_65" href="#" />
				<area shape="poly" coords="3803,1629,3806,1341,3991,1343,3987,1631" alt="66" target="zarzuela_66" href="#" />
				<area shape="poly" coords="3987,1631,3991,1343,4120,1345,4116,1633" alt="67" target="zarzuela_67" href="#" />
				<area shape="poly" coords="4116,1633,4120,1345,4248,1347,4244,1634" alt="68" target="zarzuela_68" href="#" />
				<area shape="poly" coords="4244,1634,4249,1347,4375,1348,4373,1635" alt="69" target="zarzuela_69" href="#" />
				<area shape="poly" coords="4629,1639,4633,1350,4504,1349,4501,1638" alt="70" target="zarzuela_70" href="#" />
				<area shape="poly" coords="4373,1635,4376,1348,4504,1349,4501,1638" alt="71" target="zarzuela_71" href="#" />
				<area shape="poly" coords="4629,1639,4632,1351,4761,1353,4757,1642" alt="72" target="zarzuela_72" href="#" />
				<area shape="poly" coords="4757,1642,4761,1353,4890,1354,4886,1643" alt="73" target="zarzuela_73" href="#" />
				<area shape="poly" coords="4886,1643,4890,1354,5018,1356,5014,1643" alt="74" target="zarzuela_74" href="#" />
				<area shape="poly" coords="5014,1642,5018,1355,5146,1357,5143,1646" alt="75" target="zarzuela_75" href="#" />
				<area shape="poly" coords="5143,1645,5146,1357,5274,1359,5271,1647" alt="76" target="zarzuela_76" href="#" />
				<area shape="poly" coords="5271,1647,5273,1359,5402,1360,5399,1648" alt="77" target="zarzuela_77" href="#" />
				<area shape="poly" coords="5399,1648,5402,1360,5710,1364,5527,1650" alt="78" target="zarzuela_78" href="#" />
				<area shape="poly" coords="5527,1650,5710,1364,5842,1640,5583,1764" alt="79" target="zarzuela_79" href="#" />
				<area shape="poly" coords="5842,1640,5582,1764,5639,1880,5898,1756" alt="80" target="zarzuela_80" href="#" />
				<area shape="poly" coords="5898,1756,5638,1880,5694,1996,5954,1871" alt="81" target="zarzuela_81" href="#" />
				<area shape="poly" coords="5954,1871,5694,1996,5749,2111,6009,1987" alt="82" target="zarzuela_82" href="#" />
				<area shape="poly" coords="6009,1987,5749,2111,5805,2228,6065,2103" alt="83" target="zarzuela_83" href="#" />
				<area shape="poly" coords="6065,2103,5805,2228,5861,2344,6120,2218" alt="84" target="zarzuela_84" href="#" />
				<area shape="poly" coords="6120,2218,5861,2344,5915,2459,6176,2333" alt="85" target="zarzuela_85" href="#" />
				<area shape="poly" coords="6176,2333,5915,2460,5972,2574,6231,2450" alt="86" target="zarzuela_86" href="#" />
				<area shape="poly" coords="6231,2450,5972,2574,6026,2690,6287,2566" alt="87" target="zarzuela_87" href="#" />
				<area shape="poly" coords="6287,2566,6026,2690,6081,2806,6342,2681" alt="88" target="zarzuela_88" href="#" />
				<area shape="poly" coords="6342,2681,6081,2806,6113,2867,6133,2899,6147,2922,6414,2797,6365,2730" alt="89" target="zarzuela_89" href="#" />
				<area shape="poly" coords="6416,2799,6458,2855,6428,2868,6433,3121,6300,3124,6149,2921" alt="90" target="zarzuela_90" href="#" />
				<area shape="poly" coords="5819,2941,5939,3158,5938,3227,5697,3230,5699,2942" alt="92" target="zarzuela_92" href="#" />
				<area shape="poly" coords="5699,2942,5696,3230,5568,3231,5571,2943" alt="93" target="zarzuela_93" href="#" />
				<area shape="poly" coords="5571,2943,5568,3232,5439,3232,5443,2945" alt="94" target="zarzuela_94" href="#" />
				<area shape="poly" coords="5442,2944,5439,3232,5311,3234,5314,2946" alt="95" target="zarzuela_95" href="#" />
				<area shape="poly" coords="5314,2946,5311,3234,5182,3235,5185,2948" alt="96" target="zarzuela_96" href="#" />
				<area shape="poly" coords="5185,2948,5182,3235,5054,3237,5057,2950" alt="97" target="zarzuela_97" href="#" />
				<area shape="poly" coords="5057,2950,5053,3236,4926,3238,4929,2952" alt="98" target="zarzuela_98" href="#" />
				<area shape="poly" coords="4929,2952,4926,3238,4797,3239,4800,2954" alt="99" target="zarzuela_99" href="#" />
				<area shape="poly" coords="4800,2954,4797,3239,4669,3240,4672,2954" alt="100" target="zarzuela_100" href="#" />
				<area shape="poly" coords="4672,2954,4669,3241,4540,3242,4545,2956" alt="101" target="zarzuela_101" href="#" />
				<area shape="poly" coords="4545,2955,4540,3241,4411,3244,4417,2958" alt="102" target="zarzuela_102" href="#" />
				<area shape="poly" coords="4416,2957,4411,3244,4283,3244,4287,2959" alt="103" target="zarzuela_103" href="#" />
				<area shape="poly" coords="4287,2958,4283,3244,4159,3246,4159,2959" alt="104" target="zarzuela_104" href="#" />
				<area shape="poly" coords="3474,2967,3470,3253,3343,3254,3347,2968" alt="105" target="zarzuela_105" href="#" />
				<area shape="poly" coords="3346,2968,3343,3254,3214,3256,3219,2969" alt="106" target="zarzuela_106" href="#" />
				<area shape="poly" coords="3217,2969,3214,3256,3086,3258,3089,2970" alt="107" target="zarzuela_107" href="#" />
				<area shape="poly" coords="3089,2970,3086,3257,2957,3259,2961,2971" alt="108" target="zarzuela_108" href="#" />
				<area shape="poly" coords="2961,2971,2957,3259,2829,3260,2833,2973" alt="109" target="zarzuela_109" href="#" />
				<area shape="poly" coords="2833,2973,2829,3260,2701,3261,2704,2974" alt="110" target="zarzuela_110" href="#" />
				<area shape="poly" coords="2704,2974,2701,3262,2572,3263,2576,2975" alt="111" target="zarzuela_111" href="#" />
				<area shape="poly" coords="2576,2974,2572,3263,2444,3265,2448,2977" alt="112" target="zarzuela_112" href="#" />
				<area shape="poly" coords="2448,2977,2444,3265,2316,3265,2319,2978" alt="113" target="zarzuela_113" href="#" />
				<area shape="poly" coords="2319,2978,2316,3266,2187,3267,2190,2979" alt="114" target="zarzuela_114" href="#" />
				<area shape="poly" coords="2190,2979,2187,3267,2058,3269,2062,2981" alt="115" target="zarzuela_115" href="#" />
				<area shape="poly" coords="2062,2981,2058,3268,1800,3271,1917,2983" alt="116" target="zarzuela_116" href="#" />
				<area shape="poly" coords="1917,2983,2042,2673,2042,2598,2159,2599,2155,2980" alt="118" target="zarzuela_118" href="#" />
				<area shape="poly" coords="2159,2599,2288,2600,2282,2979,2155,2980" alt="119" target="zarzuela_119" href="#" />
				<area shape="poly" coords="2416,2602,2288,2601,2283,2980,2412,2978" alt="120" target="zarzuela_120" href="#" />
				<area shape="poly" coords="2416,2602,2544,2604,2539,2976,2412,2978" alt="121" target="zarzuela_121" href="#" />
				<area shape="poly" coords="2544,2604,2539,2976,2668,2975,2672,2605" alt="122" target="zarzuela_122" href="#" />
				<area shape="poly" coords="2672,2605,2668,2975,2797,2974,2801,2607" alt="123" target="zarzuela_123" href="#" />
				<area shape="poly" coords="2801,2607,2797,2973,2925,2972,2929,2608" alt="124" target="zarzuela_124" href="#" />
				<area shape="poly" coords="2929,2608,2925,2972,3053,2971,3057,2611" alt="125" target="zarzuela_125" href="#" />
				<area shape="poly" coords="3057,2611,3052,2971,3180,2970,3185,2611" alt="126" target="zarzuela_126" href="#" />
				<area shape="poly" coords="3185,2611,3180,2969,3309,2969,3313,2614" alt="127" target="zarzuela_127" href="#" />
				<area shape="poly" coords="3313,2614,3309,2968,3475,2967,3477,2657,3461,2662,3447,2667,3425,2668,3404,2667,3380,2660,3359,2651,3340,2635,3322,2615" alt="128" target="zarzuela_128" href="#" />
				<area shape="poly" coords="3480,2422,3482,2121,3356,2118,3353,2409,3450,2412,3473,2418,3471,2419,3482,2424" alt="129" target="zarzuela_129" href="#" />
				<area shape="poly" coords="3353,2410,3357,2120,3229,2117,3225,2407" alt="130" target="zarzuela_130" href="#" />
				<area shape="poly" coords="3225,2407,3229,2118,3100,2117,3095,2406" alt="131" target="zarzuela_131" href="#" />
				<area shape="poly" coords="3095,2406,3100,2117,2972,2115,2968,2404" alt="132" target="zarzuela_132" href="#" />
				<area shape="poly" coords="2968,2404,2972,2116,2843,2114,2840,2402" alt="133" target="zarzuela_133" href="#" />
				<area shape="poly" coords="2840,2402,2843,2115,2715,2111,2710,2402" alt="134" target="zarzuela_134" href="#" />
				<area shape="poly" coords="2710,2402,2715,2112,2587,2111,2582,2400" alt="135" target="zarzuela_135" href="#" />
				<area shape="poly" coords="2582,2400,2587,2112,2459,2109,2452,2398" alt="136" target="zarzuela_136" href="#" />
				<area shape="poly" coords="2452,2398,2459,2109,2329,2107,2327,2397" alt="137" target="zarzuela_137" href="#" />
				<area shape="poly" coords="2327,2397,2330,2107,2269,2105,2153,2394" alt="138" target="zarzuela_138" href="#" />
				<area shape="poly" coords="2270,2106,2343,1919,2345,1817,2461,1818,2456,2108" alt="140" target="zarzuela_140" href="#" />
				<area shape="poly" coords="2456,2108,2462,1818,2590,1820,2586,2110" alt="141" target="zarzuela_141" href="#" />
				<area shape="poly" coords="2586,2110,2591,1820,2720,1822,2715,2112" alt="142" target="zarzuela_142" href="#" />
				<area shape="poly" coords="2715,2112,2720,1822,2847,1823,2843,2115" alt="143" target="zarzuela_143" href="#" />
				<area shape="poly" coords="2843,2115,2848,1823,2976,1825,2973,2115" alt="144" target="zarzuela_144" href="#" />
				<area shape="poly" coords="2973,2115,2975,1824,3103,1826,3099,2117" alt="145" target="zarzuela_145" href="#" />
				<area shape="poly" coords="3099,2117,3103,1826,3232,1827,3229,2117" alt="146" target="zarzuela_146" href="#" />
				<area shape="poly" coords="3229,2117,3232,1827,3361,1829,3356,2119" alt="147" target="zarzuela_147" href="#" />
				<area shape="poly" coords="3356,2119,3362,1829,3488,1833,3481,2120" alt="148" target="zarzuela_148" href="#" />
				<area shape="poly" coords="4171,2128,4175,1840,4301,1841,4298,2129" alt="149" target="zarzuela_149" href="#" />
				<area shape="poly" coords="4298,2129,4301,1842,4429,1843,4426,2131" alt="150" target="zarzuela_150" href="#" />
				<area shape="poly" coords="4426,2131,4429,1842,4557,1843,4554,2132" alt="151" target="zarzuela_151" href="#" />
				<area shape="poly" coords="4554,2132,4558,1843,4686,1845,4682,2135" alt="152" target="zarzuela_152" href="#" />
				<area shape="poly" coords="4682,2135,4685,1845,4815,1848,4810,2136" alt="153" target="zarzuela_153" href="#" />
				<area shape="poly" coords="4810,2136,4815,1847,4943,1850,4939,2136" alt="154" target="zarzuela_154" href="#" />
				<area shape="poly" coords="4939,2136,4943,1849,5072,1850,5065,2140" alt="155" target="zarzuela_155" href="#" />
				<area shape="poly" coords="5065,2140,5071,1850,5200,1852,5196,2140" alt="156" target="zarzuela_156" href="#" />
				<area shape="poly" coords="5196,2140,5200,1851,5328,1853,5327,1950,5424,2145" alt="157" target="zarzuela_157" href="#" />
				<area shape="poly" coords="5424,2145,5563,2437,5320,2433,5324,2142" alt="159" target="zarzuela_159" href="#" />
				<area shape="poly" coords="5324,2142,5320,2434,5192,2431,5196,2141" alt="160" target="zarzuela_160" href="#" />
				<area shape="poly" coords="5195,2140,5192,2431,5063,2430,5066,2141" alt="161" target="zarzuela_161" href="#" />
				<area shape="poly" coords="5066,2141,5063,2431,4936,2428,4937,2138" alt="162" target="zarzuela_162" href="#" />
				<area shape="poly" coords="4937,2138,4935,2429,4808,2427,4812,2138" alt="163" target="zarzuela_163" href="#" />
				<area shape="poly" coords="4812,2138,4807,2426,4678,2425,4682,2134" alt="164" target="zarzuela_164" href="#" />
				<area shape="poly" coords="4682,2134,4679,2425,4552,2424,4555,2132" alt="165" target="zarzuela_165" href="#" />
				<area shape="poly" coords="4555,2132,4551,2425,4423,2421,4427,2132" alt="166" target="zarzuela_166" href="#" />
				<area shape="poly" coords="4427,2132,4422,2422,4293,2420,4297,2129" alt="167" target="zarzuela_167" href="#" />
				<area shape="poly" coords="4297,2129,4169,2128,4168,2431,4190,2424,4221,2421,4255,2422,4293,2421" alt="168" target="zarzuela_168" href="#" />
				<area shape="poly" coords="4176,1841,3490,1832,3481,2424,3506,2442,3526,2468,3535,2484,3542,2499,4098,2509,4107,2487,4116,2472,4140,2445,4158,2438,4168,2432" alt="169" target="zarzuela_169" href="#" />
				<area shape="poly" coords="3478,2656,3498,2643,3515,2632,3533,2608,3547,2584,3556,2560,3558,2547,4092,2556,4092,2582,4101,2601,4111,2626,4131,2642,4150,2657,4163,2668,4159,3248,3471,3253" alt="170" target="zarzuela_170" href="#" />
				<area shape="poly" coords="4159,2960,4163,2666,4187,2675,4206,2678,4235,2677,4259,2673,4285,2661,4309,2643,4304,2959" alt="171" target="zarzuela_171" href="#" />
				<area shape="poly" coords="4304,2959,4309,2643,4326,2627,4435,2629,4433,2957" alt="172" target="zarzuela_172" href="#" />
				<area shape="poly" coords="4436,2627,4433,2957,4562,2955,4564,2629" alt="173" target="zarzuela_173" href="#" />
				<area shape="poly" coords="4562,2954,4565,2629,4694,2631,4689,2953" alt="174" target="zarzuela_174" href="#" />
				<area shape="poly" coords="4689,2953,4694,2631,4822,2632,4818,2954" alt="175" target="zarzuela_175" href="#" />
				<area shape="poly" coords="4818,2953,4823,2632,4950,2635,4946,2954" alt="176" target="zarzuela_176" href="#" />
				<area shape="poly" coords="4946,2954,4950,2633,5078,2635,5074,2948" alt="177" target="zarzuela_177" href="#" />
				<area shape="poly" coords="5074,2948,5078,2635,5206,2636,5201,2948" alt="178" target="zarzuela_178" href="#" />
				<area shape="poly" coords="5200,2946,5207,2637,5335,2638,5330,2946" alt="179" target="zarzuela_179" href="#" />
				<area shape="poly" coords="5330,2946,5335,2639,5463,2641,5459,2947" alt="180" target="zarzuela_180" href="#" />
				<area shape="poly" coords="5459,2947,5463,2641,5593,2642,5588,2943" alt="181" target="zarzuela_181" href="#" />
				<area shape="poly" coords="5588,2943,5593,2643,5718,2642,5718,2760,5818,2942" alt="182" target="zarzuela_182" href="#" />
			</map>
		</div>
	</xsl:template>
</xsl:stylesheet>