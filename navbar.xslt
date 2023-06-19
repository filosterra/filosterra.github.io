<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:template match="/*">
		<nav class="navbar navbar-expand-lg fixed-top navbar-dark" xo-stylesheet="navbar.xslt">
			<script src="./js/script.js" defer="defer"></script>
			<div class="container">
				<a class="navbar-brand logo-text text-uppercase" href="/#">Filosterra</a>

				<button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
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
							<div class="dropdown-menu megamenu" role="menu" style="background-color: lightgrey;">
								<div class="row">
									<div class="col-lg-4 d-none d-lg-inline">
										<div class="post-entry-footer">
											<ul>
												<li>
													<a href="desarrollos.html#sauceda" class="w-100">
														<div class="text">
															<img src="assets/sauceda/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">La Sauceda</h5>
															</div>
														</div>
													</a>
												</li>
												<li>
													<a href="" class="w-100">
														<div class="text">
															<img src="assets/olmos/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">Los Olmos</h5>
															</div>
														</div>
													</a>
												</li>
												<li>
													<a href="" class="w-100">
														<div class="text">
															<img src="assets/altanna/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">Altanna </h5>
															</div>
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div class="col-lg-4 col-12 align-items-center justify-content-center d-flex">
										<div class="image-navigator" style="overflow: clip; max-height: 60vh; background: repeating-linear-gradient( 55deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 9px, rgba(0, 0, 1, 0.3) 9px, rgba(0, 0, 1, 0.3) 18px ); background: #f6e1b9; position: relative;" onclick="event.stopImmediatePropagation(); return false;" xo-stylesheet="mapa-slp.xslt" xo-store="#desarrollos">
											<div class="image-container" style="position: relative;transform: scale(1);translate: 0%;">
												<xsl:attribute name="onclick">this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') + .5)})`; this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) * 2}%`).join(' '); return false" oncontextmenu="this.style.transform = `scale(${Math.abs(+this.style.transform.replace(/[^\d\.]/g, '') - .5)})`;  this.style.translate = this.style.translate.split(/\s+/).map(percent => `${parseFloat(percent) / 2}%`).join(' '); return false</xsl:attribute>
												<img src="/assets/img/slp.png" style="width: 100%; height: 100%;"/>
                                        </div>
										</div>
									</div>
									<div class="col-lg-4 d-none d-lg-inline reversed">
										<div class="post-entry-footer">
											<ul>
												<li>
													<a href="desarrollos.html#sauceda" class="w-100">
														<div class="text">
															<img src="assets/sauceda/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">La Sauceda</h5>
															</div>
														</div>
													</a>
												</li>
												<li>
													<a href="" class="w-100">
														<div class="text">
															<img src="assets/olmos/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">Los Olmos</h5>
															</div>
														</div>
													</a>
												</li>
												<li>
													<a href="" class="w-100">
														<div class="text">
															<img src="assets/altanna/logo.png" alt="" class="ms-3 me-1 rounded logo"/>
                                                    </div>
														<div class="text d-none d-md-table-cell" style="text-align: center;">
															<p>Residencial Boutique</p>
															<div class="post-meta">
																<h5 class="mr-2">Altanna </h5>
															</div>
														</div>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
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
							<div class="dropdown-menu megamenu m-0 card-nosotros" role="menu">
								<h3>Nosotros</h3>
								<section>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque fermentum nisi, sed facilisis odio luctus id.</p>
								</section>
								<section class="row px-nosotros d-flex justify-content-center g-3">
									<div class="column col-10 col-md-5 col-lg-3">
										<h2>Misión</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque fermentum nisi, sed facilisis odio luctus id.</p>
									</div>
									<div class="column col-10 col-md-5 col-lg-3">
										<h2>Visión</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan faucibus massa, ut tempor diam volutpat eu.</p>
									</div>
									<div class="column col-10 col-md-5 col-lg-3">
										<h2>Valores</h2>
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel ultrices lorem. Fusce in mauris metus.</p>
									</div>
								</section>
							</div>
						</li>
						<!-- Nav Contacto -->
						<!-- <li class="nav-item">
                        <a class="nav-link text-uppercase" href="./desarrollos.html">Contacto</a>
                    </li> -->
					</ul>
				</div>
				<div class="bandcontact px-3" style="background-color: var(--contactband-bg-color);">
					<div class="bandcontactbox" style="justify-content: center; display: flex; align-items: center; flex-direction: column; height: 60px;">
						<a href="tel:4441234567" title="Contacto" class="bandcontactinfo">
							444-123-4567
						</a>
						<p class="bandcontactlabel mt-1">
							Contáctanos
						</p>
					</div>
				</div>
			</div>
		</nav>
	</xsl:template>
</xsl:stylesheet>