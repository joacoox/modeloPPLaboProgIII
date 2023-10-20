"use strict";
var Entidades;
(function (Entidades) {
    class autoBD extends Entidades.auto {
        constructor(marca, patente, color, precio, pathfoto) {
            super(marca, patente, color, precio);
            this.pathFoto = pathfoto;
        }
        ToJson() {
            const autoJson = Object.assign(Object.assign({}, JSON.parse(this.ToString())), { pathfoto: this.pathFoto });
            return autoJson;
        }
    }
    Entidades.autoBD = autoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=autoBD.js.map