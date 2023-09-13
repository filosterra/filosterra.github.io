<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<div class="dropdown-menu megamenu m-0 card-nosotros" role="menu" xo-source="#site" xo-stylesheet="nosotros.xslt">
			<h3>Nosotros</h3>
			<section>
				<p>
					<xsl:value-of select="data[@name='nosotros']"/>
				</p>
			</section>
			<section class="row px-nosotros d-flex justify-content-center g-3">
				<div class="column col-10 col-md-5 col-lg-3">
					<h2>Misión</h2>
					<p>
						<xsl:value-of select="data[@name='mision']"/>
					</p>
				</div>
				<div class="column col-10 col-md-5 col-lg-3">
					<h2>Visión</h2>
					<p>
						<xsl:value-of select="data[@name='vision']"/>
					</p>
				</div>
				<div class="column col-10 col-md-5 col-lg-3">
					<h2>Valores</h2>
					<p>
						<xsl:value-of select="data[@name='valores']"/>
					</p>
				</div>
			</section>
		</div>
	</xsl:template>
</xsl:stylesheet>