<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xsl"
>
	<xsl:template match="/*">
		<div class="col-md-6 col-sm-6 d-flex justify-content-center align-items-center">
			<xsl:apply-templates/>
		</div>
	</xsl:template>

	<xsl:template match="*"/>

	<xsl:template match="desarrollo">
		<img src="assets/img/{@id}/logo.png" alt="" class="me-4 rounded logo-footer"/>
	</xsl:template>
</xsl:stylesheet>