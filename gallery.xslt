<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<!--<div>
			<xsl:apply-templates select="data">
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
		</div>-->
		<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
			<div class="carousel-inner">
				<xsl:apply-templates select="data">
					<xsl:sort select="comment"/>
					<xsl:sort select="value"/>
				</xsl:apply-templates>
			</div>
			<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>
	</xsl:template>

	<xsl:template match="data">
		<div class="tab-pane fade" id="list-{@name}" role="tabpanel" aria-labelledby="list-{@name}-list">
			<img src="/assets/{@name}/cover.png" alt="" class="img-fluid"/>
		</div>
		<!--<div class="tab-pane fade" id="list-{@name}" role="tabpanel" aria-labelledby="list-{@name}-list">
			<img src="/assets/{@name}/cover.png" alt="" class="img-fluid"/>
		</div>-->
		<!--<div class="tab-pane fade" id="list-altanna" role="tabpanel" aria-labelledby="list-altanna-list" xo-store="#altanna:gallery" xo-stylesheet="gallery.xslt">
		</div>-->
	</xsl:template>

</xsl:stylesheet>