import { DomainException } from "@core/domain/exception/domain.exception";
import { Empresa } from "./empresa";
import { Ruc } from "./ruc";

describe('Ruc', () => {
    it.each([
        ['1234567', 9],
        ['80009735', 1],  // ANDE
        ['5', 1],
        ['31', 0],        // resto 0
        ['6', 0],         // resto 1
    ])('calcula el dígito verificador de %s', (base, digito) => {
        expect(Ruc.calcularDigitoVerificador(base)).toBe(digito);
    });

    it('acepta un RUC con dígito verificador correcto', () => {
        expect(new Ruc(' 1234567-9 ').valor).toBe('1234567-9');
    });

    it.each(['1234567-8', '1234567', '1234567-', '123456789-0', 'ABC1234-5', '1234567 - 9'])
    ('rechaza «%s»', (valor) => {
        expect(() => new Ruc(valor)).toThrow(DomainException);
    });
});

describe('Empresa', () => {
    it('exige el nombre', () => {
        expect(() => new Empresa('   ')).toThrow(DomainException);
    });

    it('deja como ausentes los campos opcionales vacíos', () => {
        const empresa = new Empresa(' Deman ', '', '  ', null);
        expect(empresa.nombre).toBe('Deman');
        expect(empresa.direccion).toBeUndefined();
        expect(empresa.ruc).toBeUndefined();
        expect(empresa.telefono).toBeUndefined();
    });

    it('valida el RUC cuando se informa', () => {
        expect(() => new Empresa('Deman', null, '1234567-1')).toThrow(DomainException);
        expect(new Empresa('Deman', null, '1234567-9').ruc).toBe('1234567-9');
    });

    it('limita el largo de los campos', () => {
        expect(() => new Empresa('x'.repeat(101))).toThrow(DomainException);
        expect(() => new Empresa('Deman', 'x'.repeat(201))).toThrow(DomainException);
        expect(() => new Empresa('Deman', null, null, '1'.repeat(21))).toThrow(DomainException);
    });
});
