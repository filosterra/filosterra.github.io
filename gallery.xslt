<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<div>
			<xsl:apply-templates select="data">
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
		</div>
	</xsl:template>

	<xsl:template match="data">
		<div class="tab-pane fade" id="list-{@name}" role="tabpanel" aria-labelledby="list-{@name}-list">
			<img src="/assets/{@name}/cover.png" alt="" class="img-fluid"/>
		</div>
		<!--<div class="tab-pane fade" id="list-altanna" role="tabpanel" aria-labelledby="list-altanna-list" xo-store="#altanna:gallery" xo-stylesheet="gallery.xslt">
		</div>-->
	</xsl:template>

</xsl:stylesheet>