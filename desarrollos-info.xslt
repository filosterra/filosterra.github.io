<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xo="http://panax.io/xover" exclude-result-prefixes="xsl xo">
	<xsl:param name="desarrollo">(xover.site.seed || '').replace(/^#/,'')</xsl:param>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="''"/>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="string(comment)"/>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="substring-after(@name,'_')"/>
	<xsl:key name="label" match="data" use="@name"/>
	<xsl:template match="/*">
		<xsl:variable name="sections" select="key('section','')"/>
		<!-- Section Desarrollos -->
		<header class="d-flex align-items-center no-background banner" style="height: 130px; min-height: 130px;" >
			<!--background: url(/assets/desarrollos/{$desarrollo}/banner.png)-->
			<div class="container">
				<div class="desarrollos-content position-relative">
					<div class="container">
						<div class="row">
							<div class="col-sm-12">
								<div class="desarrollos-info">
									<h2 class="banner-title text-uppercase text-center headline">
										<xsl:value-of select="$desarrollo" />
									</h2>
									<p class="py-3 h5 text-uppercase text-center">
										<xsl:value-of select="key('label','motto')"/>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<xsl:apply-templates mode="section" select="$sections">
			<xsl:sort select="@name"/>
		</xsl:apply-templates>
	</xsl:template>

	<xsl:template mode="title" match="*">
	</xsl:template>

	<xsl:template mode="title" match="value[contains(.,':')]">
		<xsl:value-of select="substring-before(.,':')"/>
	</xsl:template>

	<xsl:template mode="content" match="*">
		<xsl:value-of select="."/>
	</xsl:template>

	<xsl:template mode="content" match="value[contains(.,':')]">
		<xsl:value-of select="substring-after(.,':')"/>
	</xsl:template>

	<xsl:template mode="section" match="data">
	</xsl:template>

	<xsl:template mode="section" match="key('section','')">
		<xsl:variable name="title" select="substring-before(value,':')"/>
		<xsl:variable name="subtitle" select="substring-before(value,':')"/>
		<xsl:variable name="paragraph" select="substring-after(value,':')"/>
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="{@name}">
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="text-uppercase">
						<xsl:apply-templates mode="title" select="value"/>
					</h4>
					<!--<h4 class="py-2">
						<xsl:value-of select="$subtitle"/>
					</h4>-->
				</div>
				<div class="row gy-4 mt-1">
					<p class="mb-5">
						<xsl:apply-templates mode="content" select="value"/>
					</p>
				</div>
			</div>
		</section>
	</xsl:template>

	<xsl:template mode="section" match="key('section','mapa')">
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="loteador">
			<xsl:variable name="title" select="substring-before(key('section','2'),':')"/>
			<xsl:variable name="paragraph" select="substring-after(key('section','2'),':')"/>
			<xsl:variable name="pin" select="substring-before(key('label','pin'),'/')"/>
			<xsl:variable name="translate" select="substring-after(key('label','pin'),'/')"/>
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="py-2">
						<xsl:value-of select="$title"/>
					</h4>
				</div>
				<div class="row px-5">
					<div class="col-lg-5 d-flex justify-content-end">
						<div class="image-navigator" style="overflow: clip; max-height: 60vh; background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px ); background: #f6e1b9; position: relative;" onclick="event.stopImmediatePropagation(); return false;">
							<div class="image-container" style="position: relative; transform: scale(2); translate: {$translate};">
								<xsl:attribute name="onclick">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') + .5)})`; this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) * 2}%`).join(' '); return false</xsl:attribute>
								<xsl:attribute name="oncontextmenu">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') - .5)})`;  this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) / 2}%`).join(' '); return false</xsl:attribute>
								<img src="/assets/img/slp.png" style="width: 100%; height: 100%;"/>
								<div class="od" style="{$pin}; position: absolute;">
									<div class="id" style="left:-3px;top:-3px">
										<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16">
											<circle cx="8" cy="8" r="8" />
										</svg>
									</div>
									<div class="pr" style="font-size:91%;width:6em;left:4px">
										<div>
											<xsl:value-of select="$desarrollo" />
										</div>
									</div>
								</div>
								<!--<div class="od" style="top: 65.42%;left: 50.992%;position: absolute;">
                                    <div class="id" style="left:-3px;top:-3px">
                                        <img alt="Los Olmos" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/6px-Red_pog.svg.png" decoding="async" title="Los Olmos" width="6" height="6" class="notpageimage" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/9px-Red_pog.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/12px-Red_pog.svg.png 2x" data-file-width="64" data-file-height="64">
                                    </div>
                                    <div class="pr" style="font-size:91%;width:6em;left:4px"><div>Los Olmos</div></div>
                                </div>
                                <div class="od" style="top:69.42%;left: 49.992%;position: absolute;">
                                    <div class="id" style="left:-3px;top:-3px">
                                        <img alt="Altanna" src="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/6px-Red_pog.svg.png" decoding="async" title="Altanna" width="6" height="6" class="notpageimage" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/9px-Red_pog.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Red_pog.svg/12px-Red_pog.svg.png 2x" data-file-width="64" data-file-height="64">
                                    </div>
                                    <div class="pr" style="font-size:91%;width:6em;left:4px">
                                        <div>Altanna</div>
                                    </div>
                                </div>-->

							</div>
							<div class="d-flex justify-content-around" style="
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    gap: 10px;
    ">
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16" onclick="this.closest('.image-navigator').querySelector('.image-container').onclick()" style="cursor:pointer; user-select: none;">
									<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
									<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"></path>
									<path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"></path>
								</svg>
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-zoom-out" viewBox="0 0 16 16" onclick="this.closest('.image-navigator').querySelector('.image-container').oncontextmenu()" style="cursor: pointer; user-select: none;">
									<path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"></path>
									<path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"></path>
									<path fill-rule="evenodd" d="M3 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"></path>
								</svg>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="boxcard-inner">
							<header class="boxcard-head boxcard-head_tag">
								<h2 class="boxcard-title text-uppercase ">
									<xsl:value-of select="$desarrollo" />
								</h2>
							</header>
							<div class="boxcard-lead">
								<p class="boxcard-text">
									<xsl:value-of select="$paragraph"/>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</xsl:template>

	<xsl:template mode="section" match="key('section','loteador')">
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="desarrollosinfo">
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="text-uppercase">
						<xsl:value-of select="$desarrollo" /> cuenta con lo esencial para tu seguridad
					</h4>
					<h4 class="py-2">Ubicado en la zona poniente de la ciudad</h4>
				</div>
				<div class="row gy-4 mt-1">
					<a href="/loteador#{$desarrollo}">
						<img class="map" src="/assets/desarrollos/{$desarrollo}/loteador.png" border="0" orgwidth="3800" style="width: 100%; height: 100%; background: repeating-linear-gradient( 55deg, darkolivegreen, darkolivegreen 9px, darkolivegreen 9px, darkolivegreen 18px );" alt="" />
					</a>
				</div>
			</div>
		</section>
	</xsl:template>

	<xsl:template mode="section" match="key('section','cover')">
		<xsl:variable name="title" select="substring-before(value,':')"/>
		<xsl:variable name="subtitle" select="substring-before(value,':')"/>
		<xsl:variable name="paragraph" select="substring-after(value,':')"/>
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="desarrollosinfo">
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="text-uppercase">
						<xsl:value-of select="$title"/>
					</h4>
				</div>
				<div class="row">
					<p class="mb-5">
						<xsl:value-of select="$paragraph"/>
					</p>
					<div class="text-center">
						<img src="/assets/desarrollos/{$desarrollo}/background.png" alt="" class="img-fluid"/>
					</div>
				</div>
			</div>
		</section>
	</xsl:template>
</xsl:stylesheet>