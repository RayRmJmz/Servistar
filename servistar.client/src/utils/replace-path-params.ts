/**
 *
 * @param path path al cual le vamos a remplazar por el valor del parámetro (/path/:param)
 * @param paramReplace string del path que representa el parámetro (:param, :id, :idUser)
 * @param newParam valor del parámetro ('someone', '12', 'uuid')
 * @returns /path/someone, /path/12, /path/uuid
 */

export const replacePathParams = (
	path: string,
	paramReplace: string,
	newParam: string
) => path.replace(paramReplace, newParam);
