export function phoneNumberFormatter(cadena: string) {
  cadena = cadena.replace(/\s/g, "");

  // Obtener los primeros 3 caracteres
  var primerosTres = cadena.substring(0, 3);

  // Obtener los caracteres restantes y dividirlos en grupos de 4
  var restantes = cadena.substring(3);
  var gruposDeCuatro = restantes.match(/.{1,2}/g);

  // Unir los grupos de 4 con un espacio entre cada uno
  var cadenaFormateada =
    primerosTres + " " + (gruposDeCuatro ? gruposDeCuatro.join(" ") : "");

  // Retornar la cadena formateada
  return cadenaFormateada;
}
