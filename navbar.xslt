<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml" xmlns:session="http://panax.io/session">
	<xsl:param name="session:phone">'0000000000'</xsl:param>
	<xsl:template match="/*">
		<nav class="navbar navbar-expand-lg fixed-top navbar-dark" xo-stylesheet="navbar.xslt">
			<script src="./js/script.js" defer="defer"></script>
			<div class="container">
				<a class="navbar-brand logo-text text-uppercase" href="/#" style="max-width: 35vw;">
					<img src="/assets/img/logotipo.png" class="inverted" style="height: 5mm;"/>
				</a>
				<button class="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#site-navbar" aria-controls="navbarToggleExternalContent" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="navbar-collapse offcanvas-collapse px-3" id="site-navbar" style="background-color: var(--title-bg-color);
    ">
					<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
						<!-- Nav Ubicaciones -->
						<li class="nav-item dropdown has-megamenu section-ubicaciones">
							<a class="nav-link dropdown-toggle text-uppercase" href="#" data-bs-toggle="dropdown">
								Ubicaciones
							</a>
							<div class="dropdown-menu megamenu" role="menu" style="background-color: var(--filosterra-silver-cloud);" id="ubicaciones">
								<div class="row" xo-stylesheet="desarrollos-map.xslt" xo-store="#desarrollos"></div>
							</div>
						</li>
						<!-- Nav Desarrollos -->
						<li class="nav-item dropdown has-megamenu">
							<style>
								.card-desarrollos .card > a {
								height: 470px;
								overflow-x: clip;
								overflow-y: clip;
								}

								.card-desarrollos .card > a > img.logo {
								filter: brightness(0) invert(1);
								position: absolute;
								bottom: 5%;
								margin: 0 auto;
								left: 25%;
								width: 55%;
								}

								.card-desarrollos .card > a > img.cover {
								height: 100%;
								width: 100%;
								object-fit: cover;
								}
							</style>
							<a class="nav-link dropdown-toggle text-uppercase" href="#" data-bs-toggle="dropdown">
								Desarrollos
							</a>
							<div class="dropdown-menu megamenu" role="menu">
								<div class="row px-desarrollos card-desarrollos" xo-stylesheet="menu-desarrollos.xslt" xo-store="#desarrollos" />
							</div>
						</li>
						<!-- Nav Nosotros -->
						<li class="nav-item dropdown has-megamenu">
							<style>
								.card-nosotros .column {
								padding: 20px;
								background-color: lightgray;
								border-radius: 25px;
								}

								.card-nosotros > * {
								text-align: center;
								}

								.card-nosotros .column p {
								text-align: justify;
								}

								.card-nosotros section {
								padding-top: 2rem;
								padding-bottom: 2rem;
								}
							</style>
							<a class="nav-link dropdown-toggle text-uppercase" href="#" data-bs-toggle="dropdown">
								Nosotros
							</a>
							<div class="dropdown-menu megamenu m-0 card-nosotros" role="menu" xo-store="#site" xo-stylesheet="nosotros.xslt" xo-swap="inner">
							</div>
						</li>
						<!-- Nav Contacto -->
						<!-- <li class="nav-item">
                        <a class="nav-link text-uppercase" href="./desarrollos.html">Contacto</a>
                    </li> -->
					</ul>
				</div>
				<div class="bandcontact px-3" style="background-color: var(--contactband-bg-color); max-width: 35vw;">
					<div class="bandcontactbox" style="justify-content: center; display: flex; align-items: center; flex-direction: column; height: 60px;">
						<xsl:variable name="phone" select="translate($session:phone,'-','')"/>
						<a href="tel:{$phone}" title="Contacto" class="bandcontactinfo" style="line-height: 1.5rem;">
							<xsl:value-of select="concat(
							  substring($phone, 1, 3), '-', 
							  substring($phone, 4, 3), '-', 
							  substring($phone, 7))"/>
						</a>
						<p class="bandcontactlabel mt-1 d-none d-sm-flex">
							Contáctanos
						</p>
					</div>
				</div>
			</div>
		</nav>
	</xsl:template>
</xsl:stylesheet>