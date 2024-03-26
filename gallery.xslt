<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<div>
			<xsl:apply-templates select="data">
				<xsl:sort select="comment"/>
				<xsl:sort select="value"/>
			</xsl:apply-templates>
			<script>
				<![CDATA[
			let target_carousel = document.querySelector(".tab-pane.active .carousel");
			initialize_carousel(target_carousel);
			]]>
			</script>
		</div>
	</xsl:template>

	<xsl:template match="data">
		<xsl:variable name="show">
			<xsl:if test="position()=1">show active</xsl:if>
		</xsl:variable>
		<div class="tab-pane fade {$show}" id="list-{@name}" role="tabpanel" aria-labelledby="list-{@name}-list" data-bs-ride="carousel" data-bs-interval="5000">
			<div id="carousel_{@name}" class="carousel slide">
				<div class="carousel-inner" xo-source="#{@name}:gallery" xo-stylesheet="desarrollos-gallery.xslt" desarrollo="{@name}">
					<div class="carousel-item">
						<img src="/assets/desarrollos/{@name}/cover.jpg" alt="" class="img-fluid d-block w-100" />
					</div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carousel_{@name}" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carousel_{@name}" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
		<!--<div class="tab-pane fade" id="list-{@name}" role="tabpanel" aria-labelledby="list-{@name}-list">
			<img src="/assets/desarrollos/{@name}/cover.png" alt="" class="img-fluid"/>
		</div>-->
		<!--<div class="tab-pane fade" id="list-altanna" role="tabpanel" aria-labelledby="list-altanna-list" xo-source="#altanna:gallery" xo-stylesheet="gallery.xslt">
		</div>-->
	</xsl:template>

</xsl:stylesheet>