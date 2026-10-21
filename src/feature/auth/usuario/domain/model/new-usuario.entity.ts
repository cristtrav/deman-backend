import { RequiredFieldException } from "@core/domain/exception/required-field.exception"

export class NewUsuario {
    readonly _nombres: string
    readonly _apellidos: string
    readonly _ci: string
    readonly _password: string
    readonly _activo: boolean
    // Autoriza a administrar los usuarios del sistema
    readonly _isAdmin: boolean
    readonly _id?: number
    
    constructor(nombres: string, apellidos: string, ci: string, password: string, activo: boolean, isAdmin: boolean, id?: number) {
        if (nombres == null) throw new RequiredFieldException('Usuario', 'Nombres')
        if (apellidos == null) throw new RequiredFieldException('Usuario', 'Apellidos')
        if (ci == null) throw new RequiredFieldException('Usuario', 'CI')
        if (password == null) throw new RequiredFieldException('Usuario', 'Contraseña')
        if (activo == null) throw new RequiredFieldException('Usuario', 'ID')
        if (isAdmin == null) throw new RequiredFieldException('Usuario', 'Administrador')
        this._id = id
        this._nombres = nombres
        this._apellidos = apellidos
        this._ci = ci
        this._password = password
        this._activo = activo
        this._isAdmin = isAdmin
    }

    get id(): number | undefined { return this._id }
    get nombres(): string { return this._nombres }
    get apellidos(): string { return this._apellidos }
    get ci(): string { return this._ci }
    get password(): string { return this._password }
    get activo(): boolean { return this._activo }
    get isAdmin(): boolean { return this._isAdmin }
}