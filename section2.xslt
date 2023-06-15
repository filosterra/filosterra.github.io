<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xsl"
>
	<xsl:template match="/*">
		<div class="row gy-4 py-2" data-aos="zoom-in">
			<xsl:apply-templates/>
		</div>
	</xsl:template>

	<xsl:template match="*"/>

	<xsl:template match="desarrollo">
		<div class="col-md-6 col-lg-4">
			<div class="card" style="padding: 3rem;">
				<a href="loteador#{@id}">
					<img src="assets/img/{@id}/logo.png" alt="" class="img-fluid" style="width: 100%;"/>
				</a>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>