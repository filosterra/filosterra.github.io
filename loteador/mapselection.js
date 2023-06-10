// JavaScript Document
var filters = {}
var color_array = [
    '#F78181'
    , '#F79F81'
    , '#F7BE81'
    , '#F5DA81'
    , '#F3F781'
    , '#D8F781'
    , '#BEF781'
    , '#9FF781'
    , '#81F781'
    , '#81F79F'
    , '#81F7BE'
    , '#81F7D8'
    , '#81F7F3'
    , '#81DAF5'
    , '#81BEF7'
    , '#819FF7'
    , '#8181F7'
    , '#9F81F7'
    , '#BE81F7'
    , '#DA81F5'
    , '#F781F3'
    , '#F781D8'
    , '#F781BE'
    , '#F7819F'
    , '#D8D8D8'
    , '#FF0000'
    , '#FF4000'
    , '#FF8000'
    , '#FFBF00'
    , '#FFFF00'
    , '#BFFF00'
    , '#80FF00'
    , '#40FF00'
    , '#00FF00'
    , '#00FF40'
    , '#00FF80'
    , '#00FFBF'
    , '#00FFFF'
    , '#00BFFF'
    , '#0080FF'
    , '#0040FF'
    , '#0000FF'
    , '#4000FF'
    , '#8000FF'
    , '#BF00FF'
    , '#FF00FF'
    , '#FF00BF'
    , '#FF0080'
    , '#FF0040'
    , '#848484'
];

//function findDeep(element, elementName, attribute, value) {
//    var e = undefined;
//    $(element).select(elementName+(attribute?'['+attribute+(value?'="' + value+'"':'')+']':'')).each(function () {
//        e = this;
//    })
//    return e;
//};
var attributes, attribute_pattern, value_attribute, text_attribute, oSource; //Definimos a este nivel para que sean accesibles dentro de las funciones jquery
async function actualizaColores(oSource, colorear) {
    function rgbToHex(rgb) {
        // Get the RGB values by extracting the numbers
        const rgbValues = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        // Convert each RGB value to hexadecimal
        const r = parseInt(rgbValues[1]).toString(16).padStart(2, '0');
        const g = parseInt(rgbValues[2]).toString(16).padStart(2, '0');
        const b = parseInt(rgbValues[3]).toString(16).padStart(2, '0');

        // Return the hexadecimal color
        return `#${r}${g}${b}`;
    }

    let xmlData = xo.stores[location.hash];
    if (!xmlData.documentElement) await xmlData.fetch();
    xmlData = xmlData.document;

    let xmlFilters = xover.sources["settings.xml"];
    if (!xmlFilters.documentElement) await xmlFilters.fetch();
    let sFilters_bind = `${xmlFilters.find('filters').attr('bind')}`;
    let sElement_id = xmlFilters.find('filters').attr('id');
    attributes = {};
    attribute_pattern = undefined;
    value_attribute = undefined;
    text_attribute = undefined;
    var bind;
    //first = $(xmlData).find('filters').select('filter').first().attr("bind");

    let filter = xmlFilters.select('//filters/filter').filter(function (filter) {
        bind = $(oSource).closest('div.filter').attr("bind");
        return filter.attr("bind") == bind || bind === undefined && $(this).find('option').length > 0
    }).pop();

    filter = (filter || xmlFilters.selectFirst('//filters/filter'));
    attributes["value"] = (attributes["value"] || filter.attr('bind'));
    attributes["text"] = (attributes["text"] || filter.attr('bind_text') || attributes["value"]);
    attribute_pattern = "{{@value}}"
    if (filter.select('option').length > 0) {
        attribute_pattern = "{{@text}}::{{@value}}"
        //if ($("#Filtros #" + attributes["value"].replace(/[\W@]/ig, '_') + " :checkbox:checked").length > 0) first = attributes["value"];
    }
    attribute_pattern = eval("'" + attribute_pattern.replace(/\{\{\@([^\}]+)\}\}/ig, '{{\'+attributes["$1"]+\'}}') + "'");

    //$(xmlData).find('filters').select('filter[bind="' + first + '"]').select('option').each(function () {
    //    filters[filter.attr("value")] = filter.attr("color") //.replace(/\s+/gi, "-")
    //})
    var binding = String(attributes["value"]).match(/^(.+)?(@[^\]]+?)$/);
    var path = binding[1];
    var attribute = binding[2];
    if (path) path = String(path).replace(/\/$/, '').replace(/\//, '>');
    attribute = attribute.replace(/^@/, '');

    let color_list = Object.fromEntries(document.querySelector(`#Filtros`).querySelectorAll(`.filter[bind]`).toArray().map(filter => [filter.getAttribute("bind"), new Map(filter.querySelectorAll(`.filter_option [type="checkbox"]`).toArray().filter(checkbox => checkbox.previousElementSibling).map(checkbox => [checkbox.getAttribute("filtervalue"), checkbox.previousElementSibling.style.backgroundColor]))]).filter(([key, values]) => values.size));
    for (let element of xmlData.select(sFilters_bind)) {
        let oLote = document.querySelector(`area[target="SAUCEDA_${element.attr(sElement_id)}"]`)
        if (oLote) {
            let attributes = [...element.attributes];
            let color = Object.entries(color_list).map(([selector, options]) => [attributes.find(attr => attr.matches(selector)), options]).map(([attr, options]) => options.get(attr.value)).pop();
            coloreaVivienda(oLote, rgbToHex(color));
        }
    };
}

function coloreaVivienda(oLote, color) {
    let data = $(oLote).data('maphilight') || {};
    //data.alwaysOn = false;
    data.fillColor = color.replace(/^0x|^#/ig, "");
    data.fillOpacity = 0.5;
    data.strokeColor = "ffffff";
    $(this).data('maphilight', data).trigger('alwaysOn.maphilight');
    $(this).data('maphilight', data).trigger('fillColor.maphilight');

    $(oLote).attr("data-maphilight", '{"fillColor":"' + color.replace(/^0x/ig, "") + '","fillOpacity":0.5,"strokeColor":"ffffff"}');
}

function renderFilterOption(filter, values) {
    if (typeof values == 'object' && values.length) {
        for (var i = 0; i < nodes.length; ++i) {
            var value = nodes[i];
            renderFilterOption(filter, value);
        }
    } else if (typeof values == 'object' && values["_type"] == "attribute") {
        var filter_name = filter.attr("bind").replace(/[\W@]/ig, '_');
        /*renderFilterOption(filter, values["text"]);*/
        var attribute_pattern = "{{@value}}"
        if (filter.selectFirst('option')) {
            attribute_pattern = "{{@text}}::{{@value}}"
            //if ($("#Filtros #" + attributes["value"].replace(/[\W@]/ig, '_') + " :checkbox:checked").length > 0) first = attributes["value"];
        }
        var filter_value = eval("'" + attribute_pattern.replace(/\{\{\@([^\}]+)\}\}/ig, '\'+values["$1"]+\'') + "'");
        renderOption(filter_name, (values.text + '__' + (values.value || '')), values.value, values.text, filter_value, values.color, values.selected)
    } else if (typeof values == 'object') {
        for (var value in values) {
            renderFilterOption(filter, values[value]);
        }
    } else {
        var filter_name = filter.attr("bind").replace(/[\W@]/ig, '_');
        var txtCheckbox = "<input id='" + values + "' value=" + values + " onClick='Colorea(this);'  type='checkbox' class='" + filter_name + "' name='" + filter_name + "'>" + values + "<br>";
        $("<span class='filter_option'></span>").html(txtCheckbox).appendTo("#Filtros #" + filter_name);
    }
}

function fillTree(tree, path, value, text, color, selected) {
    path = String(path).match(/^([^\/]+)(\/.+)?$/);
    let partial_path = String(path[1] || '');
    let new_path = String(path[2] || '').replace(/^\//, '');
    if (!tree.hasOwnProperty(partial_path)) { tree[partial_path] = {}; }
    if (String(partial_path).match(/^@/)) {
        let attr_name = (text !== undefined ? text + "::" + value : value)
        tree[partial_path][attr_name] = {}
        tree[partial_path][attr_name]["_type"] = "attribute";
        tree[partial_path][attr_name]["color"] = color;
        tree[partial_path][attr_name]["value"] = value;
        tree[partial_path][attr_name]["text"] = text;
        tree[partial_path][attr_name]["selected"] = selected;
        ////tree[partial_path][text] = value;
        return tree[partial_path][text];
    }
    if (new_path) {
        return fillTree(tree[partial_path], new_path, value, text, color, selected);
    }
}


function fillOptions(txtNombreFiltro, tree, oNode, full_path, full_text_path, text, color) {
    let path = String(full_path).match(/^([^\/]+)(\/.+)?$/);
    let partial_path = String(path[1] || '');
    let new_path = String(path[2] || '').replace(/^\//, '');
    let text_path, partial_text_path, new_text_path
    if (full_text_path) {
        let text_path = String(full_text_path).match(/^([^\/]+)(\/.+)?$/);
        let partial_text_path = String(text_path[1] || '');
        let new_text_path = String(text_path[2] || '').replace(/^\//, '');
        if (partial_text_path != partial_path) {
            text = String(getValueFromTree($(oNode), full_text_path) || "")
            new_text_path = undefined;
        }
    }

    if (!tree.hasOwnProperty(partial_path)) {
        tree[partial_path] = {};
    }
    if (partial_path.match(/^@/)) {
        $(oNode).attr(partial_path.replace(/^@/, ''));
        let value = String(getValueFromTree($(oNode), partial_path) || "undefined")//$(oNode).attr(partial_path.replace(/^@/, ''));
        if (!tree[partial_path].hasOwnProperty(value)) {
            color = (color !== undefined ? color : color_array.shift()); //Permite nulos para indicar que no lleva color
            tree[partial_path][value] = {}
            tree[partial_path][value]["_type"] = "attribute";
            tree[partial_path][value]["color"] = color;
            tree[partial_path][value]["value"] = value;
            tree[partial_path][value]["text"] = (text || value || "Sin definir");
            //renderOption(txtNombreFiltro, value, value, value);
        }
    } else {
        $(oNode).select(partial_path).each(function () {
            fillOptions(txtNombreFiltro, tree[partial_path], this, new_path, new_text_path, text, color);
        })
    }
}

function getValueObjectFromTree(oNode, full_path) {
    let xmlTree = oNode;
    let binding = full_path.match(/^(.+)?(@[^\]]+?)$/);
    let path = binding[1];
    let attribute = binding[2];
    attribute = attribute.replace(/^@/, '');

    let values = {};
    if (path) {
        path = String(path).replace(/\/$/, '').replace(/\//, '>'); /*Primer replace quita �ltima diagonal*//*Segundo replace cambia diagonales por "mayor que" para buscarlo como selector*/
        $(xmlTree).find(path).each(function () {
            let oNode = $(this);
            let val = oNode.attr(attribute);
            values[val] = val;
        })
    } else {
        let val = oNode.attr(attribute);
        values[val] = val;
    }
    return values;

}

function getValueFromTree(oNode, full_path) {
    let xmlTree = oNode;
    let binding = full_path.match(/^(.+)?(@[^\]]+?)$/);
    let path = binding[1];
    let attribute = binding[2];
    attribute = attribute.replace(/^@/, '');

    let values = [];
    if (path) {
        path = String(path).replace(/\/$/, '').replace(/\//, '>'); /*Primer replace quita �ltima diagonal*//*Segundo replace cambia diagonales por "mayor que" para buscarlo como selector*/
        $(xmlTree).find(path).each(function () {
            let element = $(this);
            values.push(element.attr(attribute));
        })
    } else {
        values.push(oNode.attr(attribute));
    }
    return values;
}

//function getValueFromTree(oNode, path) {
//    let path = String(path).match(/^([^\/]+)(\/.+)?$/);
//    let partial_path = String(path[1] || '');
//    let new_path = String(path[2] || '').replace(/^\//, '');

//    if (partial_path.match(/^@/)) {
//        let value = oNode.attr(partial_path.replace(/^@/, ''));
//        if (value) return [value];
//    } else {
//        let values = [];
//        oNode.select(partial_path).each(function () {
//            values.push(getValueFromTree($(this), new_path));
//        })
//        return values;
//    }
//    return undefined;
//}

function renderOption(filter_name, id, value, text, filter_value, color, selected) {
    let txtCheckbox = (color ? "<span style='background-color: #" + color.replace(/^0x|^#/i, '') + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> " : "") + "<input id='" + id + "' value='" + (value || '').replace(/'/gi, "\\'") + "' filterValue='" + (filter_value || value) + "' onClick='Colorea(this);'  type='checkbox' " + (selected == 'true' ? 'checked="true"' : '') + "class='" + filter_name + "' name='" + filter_name + "'/><label onClick='Colorea(this.previousSibling, true);'>" + text + "</label><br>";
    $("<span class='filter_option'></span>").html(txtCheckbox).appendTo("#Filtros #" + filter_name);
}

//function renderFilters(txtNombreFiltro, oNode, path, tree, color) {
//    let path = String(path).match(/^([^\/]+)(\/.+)?$/);
//    let partial_path = String(path[1] || '');
//    let new_path = String(path[2] || '').replace(/^\//, '');

//    if (!tree.hasOwnProperty(partial_path)) {
//        tree[partial_path] = {};
//    }
//    if (partial_path.match(/^@/)) {
//        $(oNode).attr(partial_path.replace(/^@/, ''));
//        let value = $(oNode).attr(partial_path.replace(/^@/, ''));
//        if (!tree[partial_path].hasOwnProperty(value)) {
//            color = (color !== undefined ? color : color_array.shift());
//            tree[partial_path][value] = color;
//            let txtCheckbox = (color ? "<span style='background-color: " + color + "'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> " : "") + "<input id='" + value + "' value=" + value + " onClick='Colorea(this);'  type='checkbox' class='" + txtNombreFiltro + "' name='" + txtNombreFiltro + "'>" + value + "<br>";
//            $("<span></span>").html(txtCheckbox).appendTo("#Filtros #" + txtNombreFiltro);
//        }
//    } else {
//        $(oNode).select(partial_path).each(function () {
//            fillOptions(txtNombreFiltro, this, new_path, tree[partial_path], color);
//        })
//    }
//}

function getValueFromObject(oNode, path) {
    path = String(path).match(/^([^\/]+)(\/.+)?$/);
    let partial_path = String(path[1] || '');
    let new_path = String(path[2] || '').replace(/^\//, '');

    if (!oNode.hasOwnProperty(partial_path)) return undefined;
    if (partial_path.match(/^@/)) {
        value = oNode[partial_path];
        return value;
    } else {
        value = getValueFromObject(oNode[partial_path], new_path);
    }
    return value;
}

function getNodeFromObject(oNode, path) {
    path = String(path).match(/^([^\/]+)(\/.+)?$/);
    let partial_path = String(path[1] || '');
    let new_path = String(path[2] || '').replace(/^\//, '');

    if (!oNode.hasOwnProperty(partial_path)) { oNode[partial_path] = {}; }
    let value = {};
    if (partial_path.match(/^@/)) {
        value = oNode[partial_path];
        return oNode[partial_path];
    } else {
        value = getNodeFromObject(oNode[partial_path], path);
    }
    return value;
}

function testConditions(oNode, conditions) {
    let compliesOverall = true;
    for (let property in conditions) {
        if (property.match(/^@/)) {
            if (!conditions[property].hasOwnProperty(String((oNode.attr(property.replace(/^@/, '')) || "")))) {//.replace(/\s+/gi, "-")
                compliesOverall = false;
            }
        } else {
            let complies = false;
            oNode.select(property).each(function () {
                if (!complies) {
                    complies = testConditions($(this), conditions[property]);
                }
            })
            if (!complies) compliesOverall = false;
        }
        if (compliesOverall == false) return false;
    }
    return true;
}

async function Colorea(oSource, colorear) {
    let xmlData = xo.stores[location.hash];
    if (!xmlData.documentElement) await xmlData.fetch();
    xmlData = xmlData.document;

    let xmlFilters = xover.sources["settings.xml"];
    if (!xmlFilters.documentElement) await xmlFilters.fetch();
    let conditions = {};
    for (let filter of xmlFilters.select(`//filters/filter`)) {
        let bind = filter.attr('bind');

        //if (bind.match(/^@/)) {
        let sBind = bind.replace(/[\W@]/ig, '_');
        for (let selection of [...document.querySelectorAll(`#Filtros #${sBind} input[type=checkbox]:checked`)]) {
            fillTree(conditions, bind, selection.value);
        }
    }
    actualizaColores(oSource, colorear);

    iluminarMapa(conditions);

    let xData = xover.xml.createDocument(xmlData);
    if (xData && xData.selectSingleNode('/*/presupuestos')) {
        console.clear();
        let aPresupuestos = document.querySelectorAll('#_Presupuesto input[type=checkbox]:not(:checked)');

        [].forEach.call(document.querySelectorAll('#_Presupuesto input[type=checkbox]'), function (presupuesto) {
            if (presupuesto.value) {
                let grafica = document.querySelector('#graficas_' + presupuesto.value.replace(/\s/ig, '_'));
                if (grafica) {
                    grafica.style.display = 'inline';
                }
                console.log(presupuesto.value);
            }
        });

        if (document.querySelectorAll('#_Presupuesto input[type=checkbox]:checked').length) {
            [].forEach.call(aPresupuestos, function (presupuesto) {
                if (presupuesto.value) {
                    xdom.data.remove(xData.selectNodes('/*/data/item[@Presupuesto="' + presupuesto.value + '"]'));
                    xdom.data.remove(xData.selectNodes('/*/presupuestos/*[@Nombre="' + presupuesto.value + '"]'));
                    let grafica = document.querySelector('#graficas_' + presupuesto.value.replace(/\s/ig, '_'));
                    if (grafica) {
                        grafica.style.display = 'none';
                    }
                    console.log(presupuesto.value);
                }
            });
        }
        let aContratistas = document.querySelectorAll('#_Contratista input[type=checkbox]:not(:checked)');
        if (document.querySelectorAll('#_Contratista input[type=checkbox]:checked').length) {
            [].forEach.call(aContratistas, function (contratista) {
                if (contratista.value) {
                    xdom.data.remove(xData.selectNodes('/*/data/item[@Contratista="' + contratista.value + '"]'));
                    xdom.data.remove(xData.selectNodes('/*/presupuestos/*[@Contratista="' + contratista.value + '"]'));
                    console.log(contratista.value);
                }
            });
        }
        let target = document.getElementById("financieros")
        oFinancieros = xdom.xml.transform(xData, xslt);
        if (target && oFinancieros) {
            xdom.dom.clear(target);
            target.parentNode.replaceChild(oFinancieros.documentElement, target);
        }
    }

}

async function iluminarMapa(conditions) {
    conditions = (conditions || {});
    let xmlData = xo.stores[location.hash];
    if (!xmlData.documentElement) await xmlData.fetch();
    xmlData = xmlData.document;
    
    let xmlFilters = xover.sources["settings.xml"];
    if (!xmlFilters.documentElement) await xmlFilters.fetch();

    let sFilters_bind = $(xmlFilters).find('filters').attr('bind');
    let sElement_id = $(xmlFilters).find('filters').attr('id');
    $(xmlData).find(sFilters_bind).each(function () {
        let oVivienda = $(this);
        let txtIdentificador = '#' + $(this).attr(sElement_id);
        let oLote = $(txtIdentificador);
        if (oLote.length == 0) {
            console.log(txtIdentificador + ' no existe')
        } else {
            let data = $(txtIdentificador).mouseout().data('maphilight') || {};
            let turnOff = false;
            turnOff = !testConditions($(this), conditions);
            data.alwaysOn = !turnOff;

            $(txtIdentificador).data('maphilight', data);
        }
    });
    $("map").trigger('alwaysOn.maphilight');
}


let ubicacion_seleccionada = undefined;
$(function () {
    //$('.map').maphilight();
    $('img[usemap]').maphilight();

    $('area').click(async function (e) {
        e.preventDefault();
        let txtIdentificador = $(this).attr('id');
        if (ubicacion_seleccionada == txtIdentificador) {
            ubicacion_seleccionada = undefined;
        }
        else {
            ubicacion_seleccionada = txtIdentificador
        }


        //$('#ViviendaDetalles').show();

        let xmlData = xo.stores[location.hash];
        if (!xmlData.documentElement) await xmlData.fetch();
        xmlData = xmlData.document;

        let xmlFilters = xover.sources["settings.xml"];
        if (!xmlFilters.documentElement) await xmlFilters.fetch();

        let sFilters_bind = $(xmlFilters).find('filters').attr('bind'); //Recuperamos el nombre del nodo con el que se hace el binding principal
        let sElement_id = $(xmlFilters).find('filters').attr('id'); //Recuperamos el nombre del atributo del nodo principal
        let target_node = undefined;
        if (ubicacion_seleccionada) {
            target_node = $(xmlData).find(sFilters_bind + '[' + sElement_id + '="' + ubicacion_seleccionada + '"]'); //Recuperamos el nodo en el XML correspondiente al nodo seleccionado.
            // TODO: Informar que si el nodo seleccionado no tiene correspondencia, considerar que a veces esto es con toda la intención, pues el rango obtenido podr�a estar filtrado.
            let htmlDetails = $(xmlFilters).find('details').clone(); // Clon xamos el html de los detalles
            //binding.bindData(htmlDetails, 'visible', target_node);
            htmlDetails.find('*[visible]').each(function () { // Buscamos dentro del detalle todos los nodos que son visibles dependiendo de un atributo (S�lo uno. TODO: que puedan ser m�s de un atributo y con operadores and y or)
                let condition = $(this).attr('visible');
                let bindings = condition.match(/{{[^}]+}}/);
                for (let b = 0; b < bindings.length; b++) {
                    let attr = bindings[b]; //Recuperamos el nombre del atributo a enlazar.
                    let value = String(getValueFromTree(target_node, attr.replace(/[{}]/gi, ''))); //Recuperamos el valor sin importar la profundidad a la que est� definido
                    value = (value.length ? "'" + value + "'" : value);
                    condition = condition.replace(attr, value)
                }

                if (!eval(condition)) {
                    $(this).remove();
                } else {
                    $(this).removeAttr('visible'); //Quitamos el atributo para que no se renderee
                }
            });

            htmlDetails.find('*[bind]').each(function () { // Buscamos dentro del detalle todos los nodos que fueron marcados para hacer binding
                let attr = $(this).attr('bind'); //Recuperamos el nombre del atributo a enlazar. 
                let value = getValueFromTree(target_node, attr); //Recuperamos el valor sin importar la profundidad a la que est� definido
                if (!value) {
                    $(this).remove();
                } else {
                    $(this).removeAttr('bind'); //Quitamos el atributo para que no se renderee
                    $(this).html(value.join()); //Colocamos el valor, si es m�s de un valor lo concatenamos
                }
            });

            htmlDetails.find('*[value]').each(function () { // Buscamos dentro del detalle todos los nodos que fueron marcados para hacer binding
                let condition = $(this).attr('value');
                let bindings = condition.match(/{{[^}]+}}/);
                for (let b = 0; b < bindings.length; b++) {
                    let attr = bindings[b]; //Recuperamos el nombre del atributo a enlazar.
                    let value = String(getValueFromTree(target_node, attr.replace(/[{}]/gi, ''))); //Recuperamos el valor sin importar la profundidad a la que est� definido
                    condition = condition.replace(attr, value)
                }
                $(this).attr('value', condition); //Colocamos el valor, si es m�s de un valor lo concatenamos

            });
            $('#ViviendaDetalles').html(htmlDetails.get(0).innerHTML);
            //let oPrototipo = $(xmlData).find(sFilters_bind+'['+sElement_id+'="' + ubicacion_seleccionada + '"]');
        } else {
            $('#ViviendaDetalles').html('');
        }

        $('#ViviendaDetalles').removeClass()
        $('#ViviendaDetalles').addClass($(target_node).attr('ViviendaDetallesCSS'))

        //$('#datosPrivados').removeClass()
        //$('#datosPrivados').addClass($(oPrototipo).attr('DatosPrivadosCSS'))

        //$('#sEstacion').html($(oPrototipo).attr('estacion'));

        $("#panel").slideDown("slow");
        $(".btn-slide").toggleClass("active");

        if (ubicacion_seleccionada) {
            let oVivienda = $("#" + ubicacion_seleccionada);
            if (oVivienda) {
                //coloreaVivienda(oVivienda, '#80FF00');
                let conditions = { "@Identificador": {} }
                conditions["@Identificador"][ubicacion_seleccionada] = { "color": "blue" }
                iluminarMapa(conditions);
            }

            let xData = xdom.xml.createDocument(xmlData);
            if (xData) {
                console.clear();
                if (ubicacion_seleccionada) {
                    xdom.data.remove(xData.selectNodes('/*/data/item[@Identificador!="' + ubicacion_seleccionada + '"]'));
                    xdom.data.remove(xData.selectNodes('/*/presupuestos/Presupuesto[not(.//*[@IdVivienda="' + txtIdentificador + '"])]'));
                    xdom.data.remove(xData.selectNodes('/*/presupuestos/Presupuesto/*/*[string(@IdVivienda)!="' + txtIdentificador + '"]'));
                }

                let target = document.getElementById("financieros")
                oFinancieros = xdom.xml.transform(xData, xslt);
                if (target && oFinancieros) {
                    xdom.dom.clear(target);
                    target.parentNode.replaceChild(oFinancieros.documentElement, target);
                }
            }
        } else {
            Colorea();
        }

        return false;
    });
});

let binding = {}
binding.bindData = function (scope, attribute, x_source, removeAttribute) {
    scope.find('*[' + attribute + ']').each(function () { // Buscamos dentro del detalle todos los nodos que son visibles dependiendo de un atributo (S�lo uno. TODO: que puedan ser m�s de un atributo y con operadores and y or)
        let condition = $(this).attr('visible');
        let bindings = condition.match(/{{[^}]+}}/);
        for (let b = 0; b < bindings.length; b++) {
            let attr = bindings[b]; //Recuperamos el nombre del atributo a enlazar.
            let value = String(getValueFromTree(x_source, attr.replace(/[{}]/gi, ''))); //Recuperamos el valor sin importar la profundidad a la que est� definido
            value = (value.length ? "'" + value + "'" : value);
            condition = condition.replace(attr, value)
        }

        if (!eval(condition)) {
            $(this).remove();
        } else {
            $(this).removeAttr(attribute); //Quitamos el atributo para que no se renderee
        }
    });
}

jQuery.extend({
    getValues: function (url) {
        let xmlDocument = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'xml',
            async: false,
            cache: false,
            success: function (data) {
                xmlDocument = data;
                $("#fecha_actualizacion").html($(xmlDocument).find('Fraccionamiento').attr('UltimaActualizacion'));
            }
        });
        return xmlDocument;
    }
});

function resize() {
    let ImageMap = function (map) {
        let n,
            areas = map.getElementsByTagName('area'),
            len = areas.length,
            coords = [],
            previousWidth = document.querySelector('#Mapa img').getAttribute("orgwidth"); /*Tamaño original de la imagen*/

        for (n = 0; n < len; n++) {
            coords[n] = areas[n].coords.split(',');
        }
        this.resize = function () {
            let n, m, clen,
                x = $('#Mapa').width() / previousWidth;
            //x = document.body.clientWidth / previousWidth;
            for (n = 0; n < len; n++) {
                clen = coords[n].length;
                for (m = 0; m < clen; m++) {
                    coords[n][m] *= x;
                }
                areas[n].coords = coords[n].join(',');
            }
            previousWidth = $('#Mapa').width();
            //previousWidth = document.body.clientWidth;
            return true;
        };
        window.onresize = this.resize;
    },
        imageMap = new ImageMap(document.querySelector(`map`));

    imageMap.resize();
}

window.onload = async function () {
    let color, txtBind;
    let xmlData = xo.stores[location.hash];
    if (!xmlData.documentElement) await xmlData.fetch();
    xmlData = xmlData.document;
    let xmlFilters = xover.sources["settings.xml"];
    if (!xmlFilters.documentElement) await xmlFilters.fetch();
    let sFilters_bind = $(xmlFilters).find('filters').attr('bind');

    let defined_options = (xmlFilters.select('//filters/filter/option').length > 0)

    xmlFilters.select('//filters/filter').forEach(function (filter) {
        let bind = filter.attr("bind");
        let bind_text = filter.attr("bind_text");
        let txtNombreFiltro = bind.replace(/[\W@]/ig, '_');

        let txtDiv = "<div id='" + txtNombreFiltro + "' bind=\"" + bind + "\" class='filter'><h4 onClick='Colorea(this)' style='cursor:pointer;'>" + filter.attr("title") + "</h4></div>";

        $("<span class='col'></span>").html(txtDiv).appendTo("#Filtros");

        let filter_options = filter.select('option');
        if (filter_options.length > 0) {
            //Checkboxes de colores
            filter_options.each(function (option) {
                let txtNombre = option.attr('text');
                let txtValue = option.attr('value');
                let txtColor = option.attr('color').replace(/^0x/ig, '');
                let selected = option.attr('selected');
                fillTree(filters, bind, txtValue, txtNombre, txtColor, selected);
            }); //Checkboxes de prototipos		
        } else {
            //Checkboxes de otros filtros
            let aFiltros = [];

            txtBind = filter.attr('bind').replace(/^@/, '');

            let options = {};
            for (let item of xmlData.select(sFilters_bind)) {
                //let nodes = getValueFromTree($(this), bind);
                //let option = (getValueFromObject(options, bind) || {});
                fillOptions(txtNombreFiltro, filters, item, bind, bind_text, undefined, defined_options ? null : undefined);
                //let text = filter.attr(txtBind);
                //if (text) {
                //    let ix = $.inArray(text, aFiltros)
                //    if (ix === -1) {
                //        aFiltros.push(text);
                //        ix = aFiltros.length;
                //        fillTree(filters, bind, text, undefined);

                //    let txtCheckbox = "<input id='" + text + "' value=" + text + " onClick='Colorea(this);'  type='checkbox' class='"
                //        + txtNombreFiltro + "' name='" + txtNombreFiltro + "'>" + text + "<br>";

                //    $("<span></span>").html(txtCheckbox).appendTo("#Filtros #" + txtNombreFiltro);
                //    }
                //}; //IF INARRAY
            }; //XML FIND EACH

        }; //ELSE si no es prototipos
        renderFilterOption(filter, getValueFromObject(filters, bind));
    });


    //Asignar colores a cada lote
    let oPrototipo, txtClass, oVivienda;

    actualizaColores();
    resize()
    Colorea();
}