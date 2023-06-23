<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xsl"
>
	<xsl:template match="/*">
		<div class="row gy-4 py-2" data-aos="zoom-in">
			<xsl:apply-templates select="data">
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
		</div>
	</xsl:template>

	<xsl:template match="*"/>

	<xsl:template match="data">
		<div class="col-md-6 col-lg-4">
			<div class="card" style="padding: 3rem;">
				<a href="desarrollos.html#{@name}">
					<img src="assets/desarrollos/{@name}/logo.png" alt="" class="img-fluid" style="width: 100%;"/>
				</a>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>