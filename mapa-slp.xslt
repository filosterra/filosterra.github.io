<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="xsl"
>
	<xsl:template match="/*">
		<div class="image-navigator" style="overflow: clip; max-height: 60vh; background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px ); background: #f6e1b9; position: relative;" onclick="event.stopImmediatePropagation(); return false;">
			<div class="image-container" style="        position: relative;
        transform: scale(1);
        translate: 0%;">
				<xsl:attribute name="onclick">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') + .5)})`; this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) * 2}%`).join(' '); return false</xsl:attribute>
				<xsl:attribute name="oncontextmenu">
					this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') - .5)})`;  this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) / 2}%`).join(' '); return false
				</xsl:attribute>
				<img src="/assets/img/desarrollos.png" style="width: 100%; height: 100%;"/>
				<div class="markers">
					<xsl:for-each select="data">
						<div xo-stylesheet="desarrollos-map-marker.xslt" xo-source="#{@name}:info" desarrollo="{value}"/>
					</xsl:for-each>
					<!--<div class="od" style="top:69.42%;left: 53.992%;position: absolute;">
						<div class="id" style="left:-3px;top:-3px">
							<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16">
								<circle cx="8" cy="8" r="8" />
							</svg>
						</div>
						<div class="pr" style="        font-size: 91%;
        width: 6em;
        left: 4px;
        position: absolute;
        translate: 10px;
">
							<div>La Sauceda</div>
						</div>
					</div>
					<div class="od" style="top: 69.42%; left: 49.992%; position: absolute; ">
						<div class="id" style="left:-3px;top:-3px">
							<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16">
								<circle cx="8" cy="8" r="8" />
							</svg>
						</div>
						<div class="pr" style="font-size:91%;width:6em;left:4px;position: absolute;
    translate: -60px;">
							<div>Los Olmos</div>
						</div>
					</div>
					<div class="od" style="top: 65.42%; left: 50.992%; position: absolute;">
						<div class="id" style="left:-3px;top:-3px">
							<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16">
								<circle cx="8" cy="8" r="8" />
							</svg>
						</div>
						<div class="pr" style="font-size:91%;width:6em;left:4px;position: absolute;
    translate: -60px -20px;">
							<div>Altanna</div>
						</div>
					</div>-->
				</div>
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
	</xsl:template>


	<xsl:template match="/*">
		<div>
			<img src="/assets/img/desarrollos.png" style="width: 100%; height: 100%;"/>
		</div>
	</xsl:template>
</xsl:stylesheet>