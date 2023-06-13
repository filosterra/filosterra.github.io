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

  <xsl:template match="/">
	  <img src="/logos/sauceda.png"/>
  </xsl:template>

</xsl:stylesheet>