<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<div class="offcanvas-header">
			<xsl:apply-templates select="data[@name='title']"/>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body small">
			<xsl:apply-templates select="data[@name!='title']"/>
		</div>
	</xsl:template>

	<xsl:template match="data[contains(@name,'title')]">
		<h5 class="offcanvas-title" id="offcanvasBottomLabel">
			<xsl:apply-templates/>
		</h5>
	</xsl:template>

	<xsl:template match="data[contains(@name,'paragraph')]">
		<p>
			<xsl:apply-templates/>
		</p>
	</xsl:template>

</xsl:stylesheet>