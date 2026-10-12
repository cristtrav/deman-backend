import { Temporal } from "@js-temporal/polyfill";
import { PedidoReadRepository } from "../read-repository/pedido-read.repository";
import { ConsultarProximasEntregasUseCase } from "./consultar-proximas-entregas.usecase";

describe('ConsultarProximasEntregasUseCase', () => {
    const hoy = Temporal.PlainDate.from('2026-10-12')
    const pagination = { page: 1, pageSize: 5 }

    let repo: jest.Mocked<PedidoReadRepository>
    let useCase: ConsultarProximasEntregasUseCase

    beforeEach(() => {
        repo = {
            consultar: jest.fn(),
            contarPendientes: jest.fn(),
            consultarPendientesPorEntrega: jest.fn().mockResolvedValue({ data: [], page: { ...pagination, total: 0 } })
        }
        useCase = new ConsultarProximasEntregasUseCase(repo, () => hoy)
    })

    const rango = () => repo.consultarPendientesPorEntrega.mock.calls[0].slice(0, 2).map(d => d?.toString())

    it('hoy consulta solo la fecha actual', async () => {
        await useCase.execute({ periodo: 'hoy', pagination })

        expect(rango()).toEqual(['2026-10-12', '2026-10-12'])
        expect(repo.consultarPendientesPorEntrega.mock.calls[0][2]).toEqual(pagination)
    })

    it('semana consulta de mañana a dentro de 6 días, sin repetir los de hoy', async () => {
        await useCase.execute({ periodo: 'semana', pagination })

        expect(rango()).toEqual(['2026-10-13', '2026-10-18'])
    })

    it('la semana atraviesa el cambio de mes', async () => {
        useCase = new ConsultarProximasEntregasUseCase(repo, () => Temporal.PlainDate.from('2026-10-29'))

        await useCase.execute({ periodo: 'semana', pagination })

        expect(rango()).toEqual(['2026-10-30', '2026-11-04'])
    })

    it('atrasados consulta sin límite inferior hasta ayer', async () => {
        await useCase.execute({ periodo: 'atrasados', pagination })

        expect(rango()).toEqual([undefined, '2026-10-11'])
    })
})
