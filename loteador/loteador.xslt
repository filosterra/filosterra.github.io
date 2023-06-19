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
		<map name="map"/>
	</xsl:template>
</xsl:stylesheet>