<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="xsl">
	<xsl:param name="key"/>
	<xsl:template match="/*">
		<p>
			<xsl:value-of select="data[@name=$key]/value"/>
		</p>
	</xsl:template>
</xsl:stylesheet>