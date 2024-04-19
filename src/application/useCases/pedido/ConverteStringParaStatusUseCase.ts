import { Status } from '../../../domain/models/Pedido';

export class ConverteStringParaStatusUseCase {
  static execute(statusString: string): Status {
    const status = statusString.toLowerCase();

    if (!(status in Status)) {
      throw new Error('Status inválido');
    }

    return status as Status;
  }
}
