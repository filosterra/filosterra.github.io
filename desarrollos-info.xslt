<xsl:stylesheet version="1.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xo="http://panax.io/xover" xmlns:state="http://panax.io/state" exclude-result-prefixes="xsl xo state">
	<xsl:param name="state:desarrollo">(xover.site.seed || '').replace(/^#/,'')</xsl:param>
	<xsl:param name="editable">xover.site.querystring.has("edit")</xsl:param>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="''"/>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="string(comment)"/>
	<xsl:key name="section" match="data[starts-with(@name,'section_')]" use="substring-after(@name,'_')"/>
	<xsl:key name="label" match="data" use="@name"/>
	<xsl:template match="/*">
		<xsl:variable name="sections" select="key('section','')"/>
		<main>
			<xsl:attribute name="xo-store">#{$state:desarrollo}:info</xsl:attribute>
			<!-- Section Desarrollos -->
			<header class="d-flex align-items-center no-background banner" style="background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px); height: 230px;" >
				<script>context.addEventListener('error', function(){alert()})</script>
				<style>
					<![CDATA[
.section {
  background-color: orange;
  color: var(--main-bg-color);
  border-top: 1px solid #000;
  padding: 10px;
}

.contenteditable {
	border: dashed gray 2pt;
}
]]>
				</style>
				<script>
					<![CDATA[
				function duplicar(source) {
					let new_name = source.getAttribute("name")+'_bis';
					let new_node = xo.xml.createNode(`<data xml:space="preserve" name="${new_name}"><value/><comment/></data>`);
					source.appendAfter(new_node)
				}
			]]>
				</script>
				<!--background: url(/assets/desarrollos/{$state:desarrollo}/banner.png)-->
				<div style="height: 100%; width: 100%; background: url(/assets/desarrollos/{$state:desarrollo}/cintillo.jpg) no-repeat center center/cover; background-position-y: center;">
					<div class="container">
						<div class="desarrollos-content position-relative">
							<div class="container">
								<div class="row">
									<div class="col-sm-12">
										<div class="desarrollos-info">
											<!--<h2 class="banner-title text-uppercase text-center headline">
										
									</h2>
									<p class="py-3 h5 text-uppercase text-center">
										<xsl:value-of select="key('label','motto')"/>
									</p>-->
											<div class="d-flex justify-content-center align-items-center" style="height: 230px;">
												<img src="/assets/desarrollos/{$state:desarrollo}/logo.png" alt="" class="me-4 rounded logo-footer" style="max-height: 200px; filter: brightness(0) invert(1); width: auto;"/>
											</div>
										</div>
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
			<footer>
				<xsl:apply-templates mode="store-buttons" select="."/>
			</footer>
		</main>
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
		<xsl:variable name="paragraph" select="normalize-space(substring-after(value,':'))"/>
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="contenteditable">
			<xsl:if test="$editable='true'">contenteditable</xsl:if>
		</xsl:variable>
		<xsl:variable name="extra-classes">
			<xsl:if test="$editable='true' or string($paragraph)!=''">pb-4</xsl:if>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="{@name}">
			<div class="container pb-4">
				<xsl:if test="$editable='true' or string($title)!=''">
					<div class="text-center {$extra-classes}">
						<h4 class="text-uppercase">
							<xsl:apply-templates mode="title" select="value"/>
						</h4>
					</div>
				</xsl:if>
				<xsl:if test="$editable='true' or string($paragraph)!=''">
					<div class="row gy-4">
						<p class="{$contenteditable}" xo-scope="{value/@xo:id}" xo-attribute="text()">
							<xsl:if test="$editable='true'">
								<xsl:attribute name="contenteditable"/>
							</xsl:if>
							<xsl:apply-templates mode="content" select="value"/>
						</p>
					</div>
				</xsl:if>
			</div>
		</section>
		<xsl:apply-templates mode="section-divider" select="."/>
	</xsl:template>

	<xsl:template mode="store-buttons" match="*">
		<xsl:if test="$editable='true'">
			<div class="d-flex justify-content-center align-items-center py-3">
				<button class="" onclick="saveResx(scope)">Guardar</button>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template mode="section-divider" match="*">
		<xsl:if test="$editable='true'">
			<div class="section">
				<a id="{@xo:id}" href="#" onclick="duplicar(scope)" class="d-flex justify-content-center align-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
						<path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
					</svg>
				</a>
			</div>
		</xsl:if>
	</xsl:template>

	<xsl:template mode="section" match="key('section','mapa?')">
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<script>
			<![CDATA[
		function startDragging(clippedImage) {
			clippedImage.isDragging = true;
			initialX = event.clientX;
			initialY = event.clientY;
		}

		function stopDragging(clippedImage) {
			clippedImage.isDragging = false;
		}

		function moveImage(clippedImage) {
			if (clippedImage.isDragging) {
				let clippedImage = event.srcElement;
				const deltaX = event.clientX - initialX;
				const deltaY = event.clientY - initialY;
				const newTop = clippedImage.offsetTop + deltaY;
				const newLeft = clippedImage.offsetLeft + deltaX;

				clippedImage.style.top = `${newTop}px`;
				clippedImage.style.left = `${newLeft}px`;
				
				clippedImage.scope.set(`top: ${clippedImage.style.top}; left: ${clippedImage.style.left}`);

				initialX = event.clientX;
				initialY = event.clientY;
			}
		}]]>
		</script>
		<style>
			<![CDATA[
			#image-container {
				position: relative;
				width: 500px; /* Adjust container size as needed */
				height: 300px;
				overflow: hidden;
			}

			#clipped-image {
				position: absolute;
				top: 100px;
				left: 50px;
			}]]>
		</style>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="loteador">
			<xsl:variable name="title" select="substring-before(value[contains(.,':')],':')"/>
			<xsl:variable name="paragraph">
				<xsl:choose>
					<xsl:when test="$title!=''">
						<xsl:value-of select="substring-after(value,':')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="value"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:variable name="pin" select="key('label','pin')"/>
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="py-2">
						<xsl:value-of select="$title"/>
					</h4>
				</div>
				<div class="row px-5">
					<div class="col-lg-5 d-flex justify-content-end">
						<div class="image-navigator" style="overflow: clip; max-height: 60vh; background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px ); background: #f6e1b9; position: relative;" onclick="return;event.stopImmediatePropagation(); return false;">
							<div class="image-container" style="position: relative; transform: scale(2); width: 400px; height: 400px;">
								<xsl:attribute name="onclick">if (this.isDragging) {return}; this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') + .5)})`; this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) * 2}%`).join(' '); return false</xsl:attribute>
								<xsl:attribute name="oncontextmenu">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') - .5)})`;  this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) / 2}%`).join(' '); return false</xsl:attribute>
								<img src="/assets/desarrollos/{$state:desarrollo}/mapa.jpeg" onmousedown="startDragging(this)" onmouseup="stopDragging(this)" onmousemove="moveImage(this)" style="position: absolute; {$pin}" xo-scope="{ancestor::root/data[@name='pin']/value/@xo:id}" xo-attribute="text()"/>
								<!--<script>
									<![CDATA[
		const targetElement = context.querySelector('img');

        // Function to be executed when the observed styles change
        const stylesChangedCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'top' || mutation.attributeName === 'left')) {
					targetElement.scope.set(`top: ${targetElement.style.top}; left: ${targetElement.style.left}`);
                    // Style or top/left attribute has changed
                    console.log('Style or top/left attribute has changed:', targetElement.style.top, targetElement.style.left);
                }
            }
        };

        // Create a new MutationObserver
        const observer = new MutationObserver(stylesChangedCallback);

        // Options for the observer (we want to monitor attribute changes)
        const observerOptions = {
            attributes: true,
            attributeFilter: ['style', 'top', 'left'],
        };

        // Start observing the target element
        observer.observe(targetElement, observerOptions);
								]]>
								</script>-->
								<div class="od" style="position: absolute; top:50%; left:50%;">
									<div class="id" style="left:-3px;top:-3px; position: relative; width: 10px; height: 10px;">
										<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16" style="position:absolute; left:0; top:0;">
											<circle cx="8" cy="8" r="8" />
										</svg>
									</div>
									<div class="pr" style="font-size:91%;width:6em;left:4px">
										<div>
											<xsl:value-of select="$state:desarrollo" />
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
									<xsl:value-of select="$state:desarrollo" />
								</h2>
							</header>
							<div class="boxcard-lead">
								<p class="boxcard-text" xo-scope="{value/@xo:id}" xo-attribute="text()">
									<xsl:if test="$editable='true'">
										<xsl:attribute name="contenteditable"/>
									</xsl:if>
									<xsl:value-of select="$paragraph"/>
									<br/>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<xsl:if test="$editable">
			<xsl:apply-templates mode="section-divider" select="."/>
		</xsl:if>
	</xsl:template>

	<xsl:template mode="section" match="key('section','mapa?')">
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<script>
			<![CDATA[
		function startDragging(clippedImage) {
			clippedImage.isDragging = true;
			initialX = event.clientX;
			initialY = event.clientY;
		}

		function stopDragging(clippedImage) {
			clippedImage.isDragging = false;
		}

		function moveImage(clippedImage) {
			if (clippedImage.isDragging) {
				let clippedImage = event.srcElement;
				const deltaX = event.clientX - initialX;
				const deltaY = event.clientY - initialY;
				const newTop = clippedImage.offsetTop + deltaY;
				const newLeft = clippedImage.offsetLeft + deltaX;

				clippedImage.style.top = `${newTop}px`;
				clippedImage.style.left = `${newLeft}px`;
				
				clippedImage.scope.set(`top: ${clippedImage.style.top}; left: ${clippedImage.style.left}`);

				initialX = event.clientX;
				initialY = event.clientY;
			}
		}]]>
		</script>
		<style>
			<![CDATA[
			#image-container {
				position: relative;
				width: 500px; /* Adjust container size as needed */
				height: 300px;
				overflow: hidden;
			}

			#clipped-image {
				position: absolute;
				top: 100px;
				left: 50px;
			}]]>
		</style>
		<section class="{$section-background} section-hd d-flex align-items-center py-5" id="loteador">
			<xsl:variable name="title" select="substring-before(value[contains(.,':')],':')"/>
			<xsl:variable name="paragraph">
				<xsl:choose>
					<xsl:when test="$title!=''">
						<xsl:value-of select="substring-after(value,':')"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="value"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:variable name="pin" select="key('label','pin')"/>
			<div class="container">
				<div class="text-center pb-4">
					<h4 class="py-2">
						<xsl:value-of select="$title"/>
					</h4>
				</div>
				<div class="row px-5">
					<div class="col-lg-5 d-flex justify-content-end">
						<div class="image-navigator" style="overflow: clip; max-height: 60vh; background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px ); background: #f6e1b9; position: relative;" onclick="return;event.stopImmediatePropagation(); return false;">
							<div class="image-container" style="position: relative; transform: scale(2); width: 400px; height: 400px;">
								<xsl:attribute name="onclick">if (this.isDragging) {return}; this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') + .5)})`; this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) * 2}%`).join(' '); return false</xsl:attribute>
								<xsl:attribute name="oncontextmenu">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') - .5)})`;  this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) / 2}%`).join(' '); return false</xsl:attribute>
								<img src="/assets/desarrollos/{$state:desarrollo}/mapa.jpeg" onmousedown="startDragging(this)" onmouseup="stopDragging(this)" onmousemove="moveImage(this)" style="position: absolute; {$pin}" xo-scope="{ancestor::root/data[@name='pin']/value/@xo:id}" xo-attribute="text()"/>
								<!--<script>
									<![CDATA[
		const targetElement = context.querySelector('img');

        // Function to be executed when the observed styles change
        const stylesChangedCallback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && (mutation.attributeName === 'style' || mutation.attributeName === 'top' || mutation.attributeName === 'left')) {
					targetElement.scope.set(`top: ${targetElement.style.top}; left: ${targetElement.style.left}`);
                    // Style or top/left attribute has changed
                    console.log('Style or top/left attribute has changed:', targetElement.style.top, targetElement.style.left);
                }
            }
        };

        // Create a new MutationObserver
        const observer = new MutationObserver(stylesChangedCallback);

        // Options for the observer (we want to monitor attribute changes)
        const observerOptions = {
            attributes: true,
            attributeFilter: ['style', 'top', 'left'],
        };

        // Start observing the target element
        observer.observe(targetElement, observerOptions);
								]]>
								</script>-->
								<div class="od" style="position: absolute; top:50%; left:50%;">
									<div class="id" style="left:-3px;top:-3px; position: relative; width: 10px; height: 10px;">
										<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="currentColor" class="bi bi-circle-fill map-marker" viewBox="0 0 16 16" style="position:absolute; left:0; top:0;">
											<circle cx="8" cy="8" r="8" />
										</svg>
									</div>
									<div class="pr" style="font-size:91%;width:6em;left:4px">
										<div>
											<xsl:value-of select="$state:desarrollo" />
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
									<xsl:value-of select="$state:desarrollo" />
								</h2>
							</header>
							<div class="boxcard-lead">
								<p class="boxcard-text" xo-scope="{value/@xo:id}" xo-attribute="text()">
									<xsl:if test="$editable='true'">
										<xsl:attribute name="contenteditable"/>
									</xsl:if>
									<xsl:value-of select="$paragraph"/>
									<br/>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<xsl:if test="$editable">
			<xsl:apply-templates mode="section-divider" select="."/>
		</xsl:if>
	</xsl:template>

	<xsl:template mode="section" match="key('section','loteador')">
		<xsl:variable name="title" select="substring-before(value,':')"/>
		<xsl:variable name="subtitle" select="substring-before(value,':')"/>
		<xsl:variable name="paragraph" select="normalize-space(substring-after(value,':'))"/>
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="contenteditable">
			<xsl:if test="$editable='true'">contenteditable</xsl:if>
		</xsl:variable>
		<xsl:variable name="extra-classes">
			<xsl:if test="$editable='true' or string($paragraph)!=''">pb-4</xsl:if>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5 d-flex flex-column">
			<div class="container pb-4">
				<xsl:if test="$editable='true' or string($title)!=''">
					<div class="text-center {$extra-classes}">
						<h4 class="text-uppercase">
							<xsl:apply-templates mode="title" select="value"/>
						</h4>
					</div>
				</xsl:if>
				<xsl:if test="$editable='true' or string($paragraph)!=''">
					<div class="row gy-4">
						<p class="{$contenteditable}" xo-scope="{value/@xo:id}" xo-attribute="text()">
							<xsl:if test="$editable='true'">
								<xsl:attribute name="contenteditable"/>
							</xsl:if>
							<xsl:apply-templates mode="content" select="value"/>
						</p>
					</div>
				</xsl:if>
			</div>
			<div class="container">
				<div class="row gy-4" style="position:relative;">
					<a href="/loteador#{$state:desarrollo}">
						<img class="map" src="/assets/desarrollos/{$state:desarrollo}/loteador.png" border="0" orgwidth="3800" style="width: 100%; height: 100%; background: var(--filosterra-blue-smoke);" alt="" />
						<label style="
    color: var(--filosterra-creen-snow);
    text-align: right;
    position: absolute;
    bottom: 10px;
    right: 23px;
	cursor: pointer;
">
							<button class="btn btn-primary" style="margin: .7rem; font-size: 18pt;">Click para ver disponibilidad</button>
						</label>
					</a>
				</div>
			</div>
		</section>
		<xsl:if test="$editable">
			<xsl:apply-templates mode="section-divider" select="."/>
		</xsl:if>
	</xsl:template>

	<xsl:template mode="section" match="key('section','cover')">
		<xsl:variable name="title" select="substring-before(value,':')"/>
		<xsl:variable name="subtitle" select="substring-before(value,':')"/>
		<xsl:variable name="paragraph" select="normalize-space(substring-after(value,':'))"/>
		<xsl:variable name="section-background">
			<xsl:choose>
				<xsl:when test="position() mod 2 =1">section-light</xsl:when>
				<xsl:otherwise>section-dark</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="contenteditable">
			<xsl:if test="$editable='true'">contenteditable</xsl:if>
		</xsl:variable>
		<xsl:variable name="extra-classes">
			<xsl:if test="$editable='true' or string($paragraph)!=''">pb-4</xsl:if>
		</xsl:variable>
		<section class="{$section-background} section-hd d-flex align-items-center py-5 d-flex flex-column" id="desarrollosinfo">
			<div class="container pb-4">
				<xsl:if test="$editable='true' or string($title)!=''">
					<div class="text-center {$extra-classes}">
						<h4 class="text-uppercase">
							<xsl:apply-templates mode="title" select="value"/>
						</h4>
					</div>
				</xsl:if>
				<xsl:if test="$editable='true' or string($paragraph)!=''">
					<div class="row gy-4">
						<p class="{$contenteditable}" xo-scope="{value/@xo:id}" xo-attribute="text()">
							<xsl:if test="$editable='true'">
								<xsl:attribute name="contenteditable"/>
							</xsl:if>
							<xsl:apply-templates mode="content" select="value"/>
						</p>
					</div>
				</xsl:if>
			</div>
			<div class="row">
				<div class="text-center">
					<img src="/assets/desarrollos/{$state:desarrollo}/background.png" alt="" class="img-fluid"/>
				</div>
			</div>
		</section>
		<xsl:if test="$editable">
			<xsl:apply-templates mode="section-divider" select="."/>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>