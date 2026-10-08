import { CommandContract } from "@core/application/contract/command/command.contract";
import { EmpresaData } from "../data/empresa.data";

export interface GuardarEmpresaCommand extends CommandContract<EmpresaData> { }
