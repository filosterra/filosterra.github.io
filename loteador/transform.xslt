<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <xsl:output method="xml"
     omit-xml-declaration="yes"
     indent="yes" standalone="no"/>

  <xsl:decimal-format
    name="money"
    grouping-separator=","
    decimal-separator="."/>

  <xsl:key name="presupuestos" match="Presupuesto[@Id=//Vivienda/@IdPto]" use="generate-id(.)"/>
  <xsl:key name="costo_unitario" match="Presupuesto/Costo_Unitario/text()" use="generate-id(../../..)"/>
  <xsl:key name="costo_contrato" match="Presupuesto/Costo_Contrato/text()" use="generate-id(../../..)"/>
  <xsl:key name="costo_contrato_ubicacion" match="Presupuesto/Programado/Ubicacion/@Costo" use="generate-id(../../../..)"/>
  <xsl:key name="fondos_garantia" match="Presupuesto/OCs/OC/@FondoGarantia" use="generate-id(../../../..)"/>
  <xsl:key name="anticipos" match="Presupuesto/OCs/OC/@Anticipo" use="generate-id(../../../..)"/>
  <xsl:key name="monto_ocs" match="Presupuesto/OCs/OC/text()" use="generate-id(../../../..)"/>
  <xsl:key name="monto_ejecutado" match="Presupuesto/Ejecutado/Ubicacion/Real/text()" use="generate-id(../../../../..)"/>
  <xsl:key name="monto_programado" match="Presupuesto/Programado/Ubicacion/Plan[@SemanaCumplida='1']/text()" use="generate-id(../../../../..)"/>
  <xsl:key name="monto_pagado" match="Presupuesto/Pagos/Pago/text()" use="generate-id(../../../..)"/>
  <xsl:key name="numero_actividades" match="Presupuesto/Programado/Ubicacion/Plan/@Actividades" use="generate-id(../../../../..)"/>

  <xsl:template match="/">
    <!--<div class="col" id="financieros">-->
      <xsl:apply-templates select="//presupuestos"/>
    <!--</div>-->
  </xsl:template>

  <xsl:template match="presupuestos">
    <xsl:variable name="monto_ejecutado" select="key('monto_ejecutado',generate-id())[key('presupuestos',generate-id(../../../..))]"/>
    <xsl:variable name="monto_programado" select="key('monto_programado',generate-id())[key('presupuestos',generate-id(../../../..))]"/>
    <xsl:variable name="monto_pagado" select="key('monto_pagado',generate-id())[key('presupuestos',generate-id(../../..))]"/>
    <xsl:variable name="numero_actividades" select="key('numero_actividades',generate-id())[key('presupuestos',generate-id(../../../..))]"/>
    <div class="col-12 col-xl-4" id="financieros">
      <table class="table table-hover table-sm table-centered">
        <thead class="thead-dark">
          <tr>
            <th>&#160;</th>
            <th colspan="2">AVANCE</th>
            <th>&#160;</th>
          </tr>
          <tr>
            <th>FRACCIONAMIENTO</th>
            <th>PLAN</th>
            <th>REAL</th>
            <th>% CUMP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <xsl:value-of select="/Desarrollo/@Nombre"/>
            </td>
            <td>
              <xsl:value-of select="format-number(sum($monto_programado/../@Actividades) div sum($numero_actividades), '##0.00%', 'money')"/>
            </td>
            <td>
              <xsl:value-of select="format-number(sum($monto_ejecutado/../@Actividades) div sum($numero_actividades), '##0.00%', 'money')"/>
            </td>
            <td>--%</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-hover table-sm table-centered table-striped">
        <tbody>
          <tr>
            <td>
              <label>Lotes: </label>
              <xsl:value-of select="count(/*/data/Vivienda)"/>
              <!--, <xsl:value-of select="count(Presupuesto[key('presupuestos',generate-id())])"/>-->
            </td>
            <td>
              <label>Costo Unitario: </label>
              <xsl:value-of select="format-number(sum(key('costo_contrato_ubicacion',generate-id())[key('presupuestos',generate-id(../../..))]) div count(/*/data/Vivienda), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Monto Ejecutado / Monto Programado: </label>
              <xsl:value-of select="format-number(sum($monto_ejecutado) div sum($monto_programado), '##0.00%', 'money')"/>
            </td>
            <td>
              <label>Monto de Contrato: </label>
              <xsl:value-of select="format-number(sum(key('costo_contrato',generate-id())[key('presupuestos',generate-id(../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Monto Pagado / Monto Programado: </label>
              <xsl:value-of select="format-number(sum($monto_pagado) div sum($monto_programado), '##0.00%', 'money')"/>
            </td>
            <td>
              <label>Anticipo:</label>
              <xsl:value-of select="format-number(sum(Presupuesto[key('presupuestos',generate-id())]/Anticipo/text()), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>
              <label>Monto Pagado / Monto Ejecutado: </label>
              <xsl:value-of select="format-number(sum($monto_pagado) div sum($monto_ejecutado), '##0.00%', 'money')"/>
            </td>
            <td>
              <label>Fondo de Garantía: </label>
              <xsl:value-of select="format-number(sum(Presupuesto[key('presupuestos',generate-id())]/Fondo_Garantia/text()), '$###,##0.00', 'money')"/>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>MONTOS DE CONTRATOS</td>
            <td>
              <!--<xsl:value-of select="count(key('costo_contrato',generate-id()))"/>-->
              <xsl:value-of select="format-number(sum(key('costo_contrato_ubicacion',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>ANTICIPOS</td>
            <td>
              <xsl:value-of select="format-number(sum(key('anticipos',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>PROGRAMADO ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum($monto_programado), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>EJECUTADO ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum($monto_ejecutado), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>MONTO OCS ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum(key('monto_ocs',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>PAGADO ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum(key('monto_pagado',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>ANTICIPO ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum(key('anticipos',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
          <tr>
            <td>FONDO DE GARANTÍA ACUMULADO</td>
            <td>
              <xsl:value-of select="format-number(sum(key('fondos_garantia',generate-id())[key('presupuestos',generate-id(../../..))]), '$###,##0.00', 'money')"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </xsl:template>

</xsl:stylesheet>