<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" exclude-result-prefixes="xsl">
	<xsl:param name="desarrollo"></xsl:param>
	<xsl:template match="/*">
		<xsl:variable name="images" select="data"/>
		<div class="carousel-inner">
			<div class="carousel-item active">
				<img class="d-block w-100" src="/assets/desarrollos/{$desarrollo}/cover.png" alt="{$desarrollo}"/>
			</div>
			<xsl:apply-templates select="$images">
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
		</div>
	</xsl:template>

	<xsl:template match="data">
		<xsl:variable name="src" select="substring-before(value,';')"/>
		<div class="carousel-item">
			<img class="d-block w-100" src="/assets/desarrollos/{$desarrollo}/{$src}" alt="$desarrollo"/>
		</div>
	</xsl:template>
</xsl:stylesheet>